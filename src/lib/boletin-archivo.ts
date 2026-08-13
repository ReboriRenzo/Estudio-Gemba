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

const archivoLista = path.join(process.cwd(), "data", "boletin-noticias.json");
const dirArchivos = path.join(process.cwd(), "public", "boletin", "archivos");

export function tokenSesion(clave: string) {
  return createHmac("sha256", clave).update("estudio-gemba-boletin").digest("hex");
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

export function leerNoticias(): NoticiaBoletin[] {
  try {
    const raw = JSON.parse(readFileSync(archivoLista, "utf8")) as unknown;
    return parseNoticias(raw);
  } catch {
    return [];
  }
}

export function guardarNoticias(noticias: NoticiaBoletin[]) {
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

export function guardarBytesArchivo(nombreGuardado: string, bytes: Buffer) {
  asegurarCarpetaArchivos();
  const destino = rutaDiscoArchivo(nombreGuardado);
  if (!destino) throw new Error("Nombre de archivo inválido.");
  writeFileSync(destino, bytes);
}

export function borrarArchivoPublicado(url: string) {
  if (!url.startsWith("/boletin/archivos/")) return;
  const destino = rutaDiscoArchivo(url.slice("/boletin/archivos/".length));
  if (!destino || !existsSync(destino)) return;
  unlinkSync(destino);
}
