import { describe, expect, it } from "vitest";
import {
  getServicio,
  imagenesServicio,
  SERVICIOS,
  slugsServicios,
} from "./servicios";

describe("SERVICIOS", () => {
  it("tiene exactamente 5 líneas con slugs del spec", () => {
    expect(slugsServicios()).toEqual([
      "diagnostico-de-planta",
      "reduccion-de-perdidas",
      "smed-cambio-rapido",
      "tpm-5s",
      "implementacion",
    ]);
    expect(SERVICIOS).toHaveLength(5);
  });

  it("getServicio encuentra por slug y no inventa", () => {
    expect(getServicio("tpm-5s")?.titulo).toBe("TPM y 5S");
    expect(getServicio("inexistente")).toBeUndefined();
  });

  it("imagenesServicio arma card, planta y detalle por slug", () => {
    expect(imagenesServicio("smed-cambio-rapido")).toEqual({
      card: "/servicios/smed-cambio-rapido.png",
      planta: "/servicios/smed-cambio-rapido-alt.png",
      detalle: "/servicios/smed-cambio-rapido-detalle.png",
    });
  });
});
