import { describe, expect, it } from "vitest";
import { canalesDisponibles, contacto } from "./contacto";

describe("canalesDisponibles", () => {
  it("marca todos en false cuando las cadenas están vacías", () => {
    expect(
      canalesDisponibles({
        email: "",
        emailBoletin: "",
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
        emailBoletin: "",
        whatsapp: "54911",
        linkedin: " https://linkedin.com/company/x ",
        horario: "",
        zona: "",
      }),
    ).toEqual({ email: false, whatsapp: true, linkedin: true });
  });
});

describe("contacto v1", () => {
  it("publica el WhatsApp y los emails de consulta y boletín", () => {
    expect(contacto.email).toBe("contacto@firmind.com.ar");
    expect(contacto.emailBoletin).toBe("industria@firmind.com.ar");
    expect(contacto.whatsapp).toBe("5491127642266");
    expect(contacto.linkedin).toBe("");
    expect(contacto.horario).toBe("09:00 a 20:00");
    expect(contacto.zona).toBe("Zona Sur, Buenos Aires · Argentina");
  });
});
