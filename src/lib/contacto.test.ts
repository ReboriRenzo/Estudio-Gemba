import { describe, expect, it } from "vitest";
import { canalesDisponibles, contacto } from "./contacto";

describe("canalesDisponibles", () => {
  it("marca todos en false cuando las cadenas están vacías", () => {
    expect(
      canalesDisponibles({
        email: "",
        whatsapp: "",
        linkedin: "",
        horario: "09:00 a 20:00",
        zona: "Zona Sur, Buenos Aires · Argentina",
      }),
    ).toEqual({ email: false, whatsapp: false, linkedin: false });
  });

  it("ignora espacios", () => {
    expect(
      canalesDisponibles({
        email: "  ",
        whatsapp: "54911",
        linkedin: " https://linkedin.com/company/x ",
        horario: "",
        zona: "",
      }),
    ).toEqual({ email: false, whatsapp: true, linkedin: true });
  });
});

describe("contacto v1", () => {
  it("publica el WhatsApp de contacto", () => {
    expect(contacto.email).toBe("");
    expect(contacto.whatsapp).toBe("5491127642266");
    expect(contacto.linkedin).toBe("");
    expect(contacto.horario).toBe("09:00 a 20:00");
    expect(contacto.zona).toBe("Zona Sur, Buenos Aires · Argentina");
  });
});
