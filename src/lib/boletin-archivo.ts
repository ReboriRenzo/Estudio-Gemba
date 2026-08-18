import { createHmac, timingSafeEqual } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import {
  boletinAcceso,
  claveConfigurada,
  parseNoticias,
  type NoticiaBoletin,
} from "./boletin";

export const BOLETIN_COOKIE = "eg_boletin";

const LISTA_KEY = "lista";
const archivoLista = path.join(process.cwd(), "data", "boletin-noticias.json");
const dirArchivos = path.join(process.cwd(), "public", "boletin", "archivos");

export function tokenSesion(clave: string) {
  return createHmac("sha256", clave).update("firmind-boletin").digest("hex");
}

export function sesionValida(token: string | undefined): boolean {
  if (!claveConfigurada() || !token) return false;
  const esperado = tokenSesion(boletinAcceso.clave.trim());
  const a = Buffer.from(token);
  const b = Buffer.from(esperado);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function claveCorrecta(ingresada: string): boolean {
  if (!claveConfigurada()) return false;
  const a = Buffer.from(tokenSesion(ingresada.trim()));
  const b = Buffer.from(tokenSesion(boletinAcceso.clave.trim()));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function claveArchivo(nombreGuardado: string) {
  return `archivo/${nombreGuardado}`;
}

function enBuild() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

function enNube() {
  if (enBuild()) return false;
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);
}

async function storeNube() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "boletin", consistency: "strong" });
}

function leerListaDisco(): NoticiaBoletin[] {
  try {
    const raw = JSON.parse(readFileSync(archivoLista, "utf8")) as unknown;
    return parseNoticias(raw);
  } catch {
    return [];
  }
}

export async function leerNoticias(): Promise<NoticiaBoletin[]> {
  if (enNube()) {
    try {
      const store = await storeNube();
      const raw = await store.get(LISTA_KEY, { type: "json" });
      if (raw != null) return parseNoticias(raw);
    } catch {
      /* la lista del deploy sirve de respaldo */
    }
  }
  return leerListaDisco();
}

export async function guardarNoticias(noticias: NoticiaBoletin[]) {
  if (enNube()) {
    const store = await storeNube();
    await store.setJSON(LISTA_KEY, noticias);
    return;
  }
  writeFileSync(archivoLista, `${JSON.stringify(noticias, null, 2)}\n`, "utf8");
}

export function asegurarCarpetaArchivos() {
  mkdirSync(dirArchivos, { recursive: true });
}

export function rutaDiscoArchivo(nombreGuardado: string): string | null {
  const base = path.basename(nombreGuardado);
  if (!base || base !== nombreGuardado || base.includes("..")) return null;
  const resolved = path.resolve(dirArchivos, base);
  if (!resolved.startsWith(path.resolve(dirArchivos))) return null;
  return resolved;
}

export async function guardarBytesArchivo(nombreGuardado: string, bytes: Buffer) {
  if (enNube()) {
    const store = await storeNube();
    await store.set(claveArchivo(nombreGuardado), new Blob([new Uint8Array(bytes)]));
    return;
  }
  asegurarCarpetaArchivos();
  const destino = rutaDiscoArchivo(nombreGuardado);
  if (!destino) throw new Error("Nombre de archivo inválido.");
  writeFileSync(destino, bytes);
}

export async function borrarArchivoPublicado(url: string) {
  if (!url.startsWith("/boletin/archivos/")) return;
  const nombre = url.slice("/boletin/archivos/".length);
  if (enNube()) {
    try {
      const store = await storeNube();
      await store.delete(claveArchivo(nombre));
    } catch {
      /* si no estaba en blobs, no bloquea la baja de la nota */
    }
    return;
  }
  const destino = rutaDiscoArchivo(nombre);
  if (!destino || !existsSync(destino)) return;
  unlinkSync(destino);
}

export function tipoMimeArchivo(nombre: string): string {
  const ext = nombre.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "application/pdf";
  if (ext === "doc") return "application/msword";
  if (ext === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (ext === "xls") return "application/vnd.ms-excel";
  if (ext === "xlsx") {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }
  if (ext === "ppt") return "application/vnd.ms-powerpoint";
  if (ext === "pptx") {
    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  }
  if (ext === "txt") return "text/plain; charset=utf-8";
  if (ext === "csv") return "text/csv; charset=utf-8";
  if (ext === "rtf") return "application/rtf";
  if (ext === "odt") return "application/vnd.oasis.opendocument.text";
  if (ext === "ods") return "application/vnd.oasis.opendocument.spreadsheet";
  return "application/octet-stream";
}

export async function leerBytesArchivo(
  nombreGuardado: string,
): Promise<Buffer | null> {
  const destino = rutaDiscoArchivo(nombreGuardado);
  if (!destino) return null;

  if (enNube()) {
    try {
      const store = await storeNube();
      const data = await store.get(claveArchivo(nombreGuardado), {
        type: "arrayBuffer",
      });
      if (data) return Buffer.from(data);
    } catch {
      /* cae al archivo del deploy */
    }
  }

  if (!existsSync(destino)) return null;
  return readFileSync(destino);
}
