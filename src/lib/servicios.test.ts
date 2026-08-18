import { describe, expect, it } from "vitest";
import {
  getServicio,
  imagenesServicio,
  SERVICIOS,
  slugsServicios,
} from "./servicios";

describe("SERVICIOS", () => {
  it("tiene las tres fases del programa", () => {
    expect(slugsServicios()).toEqual([
      "diagnostico",
      "ejecucion",
      "autonomia",
    ]);
    expect(SERVICIOS).toHaveLength(3);
  });

  it("getServicio encuentra por slug y no inventa", () => {
    expect(getServicio("diagnostico")?.titulo).toBe("Diagnóstico");
    expect(getServicio("inexistente")).toBeUndefined();
  });

  it("imagenesServicio reusa fotos existentes por fase", () => {
    expect(imagenesServicio("ejecucion")).toEqual({
      card: "/servicios/implementacion.png",
      planta: "/servicios/implementacion-alt.png",
      detalle: "/servicios/implementacion-detalle.png",
    });
  });
});
