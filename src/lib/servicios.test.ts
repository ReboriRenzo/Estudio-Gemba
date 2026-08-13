import { describe, expect, it } from "vitest";
import { getServicio, SERVICIOS, slugsServicios } from "./servicios";

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
});
