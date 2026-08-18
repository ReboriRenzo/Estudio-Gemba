import { describe, expect, it } from "vitest";
import {
  claveConfigurada,
  extensionPermitida,
  parseNoticias,
  validateNoticia,
} from "./boletin";

describe("validateNoticia", () => {
  it("acepta archivo con título y ruta interna", () => {
    const r = validateNoticia({
      titulo: "Edición 01",
      url: "/boletin/archivos/abc.pdf",
      nombreArchivo: "edicion-01.pdf",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.tipo).toBe("archivo");
      expect(r.data.nombreArchivo).toBe("edicion-01.pdf");
    }
  });

  it("rechaza archivo sin título", () => {
    const r = validateNoticia({
      url: "/boletin/archivos/abc.pdf",
      nombreArchivo: "edicion.pdf",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.titulo).toBe("Completá este campo.");
  });

  it("rechaza imagen como archivo de descarga", () => {
    const r = validateNoticia({
      titulo: "Foto",
      url: "/boletin/archivos/abc.png",
      nombreArchivo: "portada.png",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.archivo).toMatch(/No se permiten imágenes/);
    }
  });
});

describe("extensionPermitida", () => {
  it("permite documentos y rechaza imágenes y ejecutables", () => {
    expect(extensionPermitida("nota.pdf")).toBe(true);
    expect(extensionPermitida("nota.PDF")).toBe(true);
    expect(extensionPermitida("plan.xlsx")).toBe(true);
    expect(extensionPermitida("foto.png")).toBe(false);
    expect(extensionPermitida("portada.JPG")).toBe(false);
    expect(extensionPermitida("nota.webp")).toBe(false);
    expect(extensionPermitida("malware.exe")).toBe(false);
  });
});

describe("parseNoticias", () => {
  it("conserva solo archivos válidos", () => {
    const items = parseNoticias([
      { id: "n1", tipo: "enlace", titulo: "Una", url: "https://a.com" },
      {
        id: "a1",
        titulo: "PDF",
        url: "/boletin/archivos/a1.pdf",
        nombreArchivo: "edicion.pdf",
      },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0]?.id).toBe("a1");
    expect(items[0]?.tipo).toBe("archivo");
  });
});

describe("claveConfigurada", () => {
  it("false si está vacía, true si hay valor", () => {
    expect(claveConfigurada("")).toBe(false);
    expect(claveConfigurada("secreto")).toBe(true);
  });
});
