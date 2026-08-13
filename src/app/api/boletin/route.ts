import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  BOLETIN_COOKIE,
  borrarArchivoPublicado,
  claveCorrecta,
  guardarBytesArchivo,
  guardarNoticias,
  leerNoticias,
  sesionValida,
  tokenSesion,
} from "@/lib/boletin-archivo";
import {
  boletinAcceso,
  claveConfigurada,
  extensionDe,
  extensionPermitida,
  TAMANIO_MAX_ARCHIVO,
} from "@/lib/boletin";

async function haySesion() {
  const jar = await cookies();
  return sesionValida(jar.get(BOLETIN_COOKIE)?.value);
}

function errorGuardado() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "No se pudo guardar. En local funciona; si el sitio está en la nube, usá el panel en esta computadora o editá data/boletin-noticias.json.",
    },
    { status: 503 },
  );
}

export async function GET() {
  if (!(await haySesion())) {
    return NextResponse.json({ ok: false, sesion: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, sesion: true, noticias: leerNoticias() });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    if (!(await haySesion())) {
      return NextResponse.json(
        { ok: false, sesion: false, message: "Sesión vencida." },
        { status: 401 },
      );
    }
    const form = await request.formData();
    if (form.get("accion") !== "archivo") {
      return NextResponse.json({ ok: false, message: "Acción desconocida." }, { status: 400 });
    }

    const titulo = typeof form.get("titulo") === "string" ? form.get("titulo") : "";
    const fecha = typeof form.get("fecha") === "string" ? form.get("fecha") : "";
    const file = form.get("archivo");

    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
      return NextResponse.json(
        { ok: false, errors: { titulo: "Completá este campo." } },
        { status: 400 },
      );
    }
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { ok: false, errors: { archivo: "Subí un archivo." } },
        { status: 400 },
      );
    }
    if (file.size > TAMANIO_MAX_ARCHIVO) {
      return NextResponse.json(
        { ok: false, errors: { archivo: "El archivo no puede superar 15 MB." } },
        { status: 400 },
      );
    }
    if (!extensionPermitida(file.name)) {
      return NextResponse.json(
        {
          ok: false,
          errors: { archivo: "Subí un archivo. PDF, Word, Excel, imagen u otro documento." },
        },
        { status: 400 },
      );
    }

    const id = crypto.randomUUID();
    const ext = extensionDe(file.name);
    const nombreGuardado = `${id}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    try {
      guardarBytesArchivo(nombreGuardado, bytes);
      const noticias = [
        {
          id,
          tipo: "archivo" as const,
          titulo: titulo.trim(),
          url: `/boletin/archivos/${nombreGuardado}`,
          fuente: "",
          fecha: typeof fecha === "string" ? fecha.trim() : "",
          nombreArchivo: file.name,
        },
        ...leerNoticias(),
      ];
      guardarNoticias(noticias);
      return NextResponse.json({ ok: true, noticias });
    } catch {
      borrarArchivoPublicado(`/boletin/archivos/${nombreGuardado}`);
      return errorGuardado();
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "No pudimos leer el pedido." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ ok: false, message: "Pedido inválido." }, { status: 400 });
  }

  const rec = body as Record<string, unknown>;
  const accion = rec.accion;

  if (accion === "entrar") {
    if (!claveConfigurada()) {
      return NextResponse.json(
        { ok: false, message: "Definí la clave en src/lib/boletin.ts para abrir el panel." },
        { status: 403 },
      );
    }
    const clave = typeof rec.clave === "string" ? rec.clave : "";
    if (!claveCorrecta(clave)) {
      return NextResponse.json({ ok: false, message: "Clave incorrecta." }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true, sesion: true, noticias: leerNoticias() });
    res.cookies.set(BOLETIN_COOKIE, tokenSesion(boletinAcceso.clave.trim()), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  if (!(await haySesion())) {
    return NextResponse.json({ ok: false, sesion: false, message: "Sesión vencida." }, { status: 401 });
  }

  if (accion === "salir") {
    const res = NextResponse.json({ ok: true, sesion: false });
    res.cookies.set(BOLETIN_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  if (accion === "quitar") {
    const id = typeof rec.id === "string" ? rec.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, message: "Falta la nota." }, { status: 400 });
    }
    const actual = leerNoticias();
    const baja = actual.find((item) => item.id === id);
    const noticias = actual.filter((item) => item.id !== id);
    try {
      if (baja) {
        borrarArchivoPublicado(baja.url);
      }
      guardarNoticias(noticias);
    } catch {
      return errorGuardado();
    }
    return NextResponse.json({ ok: true, noticias });
  }

  return NextResponse.json({ ok: false, message: "Acción desconocida." }, { status: 400 });
}
