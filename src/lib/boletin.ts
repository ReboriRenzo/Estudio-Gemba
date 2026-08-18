export type NoticiaBoletin = {
  id: string;
  tipo: "archivo";
  titulo: string;
  url: string;
  fuente: string;
  fecha: string;
  nombreArchivo: string;
};

/** Clave del panel oculto /interno. Si está vacía, el panel no abre. */
export const boletinAcceso = {
  clave: "1234",
};

const ERROR_REQUERIDO = "Completá este campo.";
export const ERROR_ARCHIVO =
  "Subí un archivo. PDF, Word, Excel u otro documento. No se permiten imágenes.";

const EXTENSIONES_IMAGEN = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "bmp",
  "ico",
  "tif",
  "tiff",
  "heic",
  "heif",
  "avif",
  "jfif",
]);

const EXTENSIONES_BLOQUEADAS = new Set([
  "exe",
  "bat",
  "cmd",
  "com",
  "scr",
  "pif",
  "msi",
  "js",
  "jse",
  "vbs",
  "vbe",
  "ws",
  "wsf",
  "wsh",
  "ps1",
  "sh",
  "dll",
  "sys",
  "inf",
  "reg",
  "hta",
  "jar",
  "apk",
]);

export const TAMANIO_MAX_ARCHIVO = 15 * 1024 * 1024;

export type FieldErrors = Record<string, string>;

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function claveConfigurada(clave = boletinAcceso.clave): boolean {
  return clave.trim().length > 0;
}

export function extensionDe(nombre: string): string {
  const base = nombre.split(/[/\\]/).pop() ?? "";
  const i = base.lastIndexOf(".");
  if (i < 0) return "";
  return base.slice(i + 1).toLowerCase();
}

export function extensionPermitida(nombre: string): boolean {
  const ext = extensionDe(nombre);
  if (!ext) return false;
  if (EXTENSIONES_IMAGEN.has(ext)) return false;
  return !EXTENSIONES_BLOQUEADAS.has(ext);
}

export function validateNoticia(
  body: unknown,
): { ok: true; data: Omit<NoticiaBoletin, "id"> } | { ok: false; errors: FieldErrors } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, errors: { _form: ERROR_REQUERIDO } };
  }
  const rec = body as Record<string, unknown>;
  const errors: FieldErrors = {};
  const titulo = readString(rec.titulo);
  const url = readString(rec.url);
  const fecha = readString(rec.fecha);
  const nombreArchivo = readString(rec.nombreArchivo);

  if (!titulo) errors.titulo = ERROR_REQUERIDO;
  if (!url.startsWith("/boletin/archivos/") || url.includes("..")) {
    errors.archivo = ERROR_ARCHIVO;
  }
  if (!nombreArchivo || !extensionPermitida(nombreArchivo)) {
    errors.archivo = ERROR_ARCHIVO;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      tipo: "archivo",
      titulo,
      url,
      fuente: "",
      fecha,
      nombreArchivo,
    },
  };
}

export function parseNoticias(raw: unknown): NoticiaBoletin[] {
  if (!Array.isArray(raw)) return [];
  const items: NoticiaBoletin[] = [];
  for (const row of raw) {
    const parsed = validateNoticia(row);
    if (!parsed.ok) continue;
    const id =
      typeof row === "object" &&
      row !== null &&
      "id" in row &&
      typeof row.id === "string" &&
      row.id.trim()
        ? row.id.trim()
        : crypto.randomUUID();
    items.push({ id, ...parsed.data });
  }
  return items;
}
