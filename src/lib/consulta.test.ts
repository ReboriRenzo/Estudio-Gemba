import { describe, expect, it, vi } from "vitest";
import { contacto } from "./contacto";
import {
  buildWhatsAppUrl,
  formatConsultaText,
  resolverEnvio,
  validateConsulta,
} from "./consulta";

const presupuestoOk = {
  tipo: "presupuesto",
  empresa: "Acme SA",
  nombre: "Ana Pérez",
  cargo: "Jefa de planta",
  email: "ana@acme.com",
  telefono: "1144445555",
  planta: "Lomas de Zamora",
  servicio: "diagnostico",
  mensaje: "Necesitamos baseline de OEE.",
  preferencia: "email",
} as const;

const newsletterOk = {
  tipo: "newsletter",
  nombre: "Ana Pérez",
  email: "ana@acme.com",
  sector: "",
  preferencia: "email",
} as const;

describe("validateConsulta", () => {
  it("rechaza presupuesto vacío", () => {
    const r = validateConsulta({ tipo: "presupuesto" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.empresa).toBe("Completá este campo.");
      expect(r.errors.nombre).toBe("Completá este campo.");
      expect(r.errors.cargo).toBe("Completá este campo.");
      expect(r.errors.email).toBe("Completá este campo.");
      expect(r.errors.telefono).toBe("Completá este campo.");
      expect(r.errors.planta).toBe("Completá este campo.");
      expect(r.errors.servicio).toBe("Completá este campo.");
      expect(r.errors.mensaje).toBe("Completá este campo.");
      expect(r.errors.preferencia).toBe("Completá este campo.");
    }
  });

  it("acepta presupuesto válido", () => {
    const r = validateConsulta(presupuestoOk);
    expect(r).toEqual({ ok: true, data: presupuestoOk });
  });

  it("rechaza email inválido", () => {
    const r = validateConsulta({ ...presupuestoOk, email: "ana@" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBe("Ingresá un email válido.");
  });

  it("rechaza mensaje de 2001 caracteres", () => {
    const r = validateConsulta({ ...presupuestoOk, mensaje: "a".repeat(2001) });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.mensaje).toBe(
        "El mensaje no puede superar 2000 caracteres.",
      );
    }
  });

  it("rechaza servicio inválido", () => {
    const r = validateConsulta({ ...presupuestoOk, servicio: "no-existe" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.servicio).toBe("Completá este campo.");
  });

  it("acepta newsletter válido sin sector", () => {
    const r = validateConsulta({
      tipo: "newsletter",
      nombre: "Ana Pérez",
      email: "ana@acme.com",
      preferencia: "email",
    });
    expect(r).toEqual({ ok: true, data: newsletterOk });
  });

  it("rechaza newsletter sin preferencia de canal", () => {
    const r = validateConsulta({
      tipo: "newsletter",
      nombre: "Ana Pérez",
      email: "ana@acme.com",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.preferencia).toBe("Completá este campo.");
  });

  it("acepta consulta por email", () => {
    const r = validateConsulta({
      tipo: "consulta",
      empresa: "Acme SA",
      nombre: "Ana Pérez",
      email: "ana@acme.com",
      mensaje: "Consulta sobre OEE.",
    });
    expect(r).toEqual({
      ok: true,
      data: {
        tipo: "consulta",
        empresa: "Acme SA",
        nombre: "Ana Pérez",
        email: "ana@acme.com",
        mensaje: "Consulta sobre OEE.",
      },
    });
  });

  it("rechaza consulta sin empresa", () => {
    const r = validateConsulta({
      tipo: "consulta",
      nombre: "Ana Pérez",
      email: "ana@acme.com",
      mensaje: "Consulta sobre OEE.",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.empresa).toBe("Completá este campo.");
  });
});

describe("resolverEnvio", () => {
  it("queued cuando no hay canales", async () => {
    const log = vi.fn();
    const r = await resolverEnvio(
      presupuestoOk,
      { ...contacto, email: "", whatsapp: "" },
      { log },
    );
    expect(r).toEqual({ kind: "queued" });
    expect(log).toHaveBeenCalledOnce();
  });

  it("whatsapp cuando hay número y preferencia whatsapp", async () => {
    const r = await resolverEnvio(
      { ...presupuestoOk, preferencia: "whatsapp" },
      { ...contacto, whatsapp: "5491112345678" },
      {},
    );
    expect(r.kind).toBe("whatsapp");
    if (r.kind === "whatsapp") {
      expect(r.url).toMatch(/^https:\/\/wa\.me\/5491112345678\?text=/);
    }
  });

  it("newsletter abre WhatsApp si la preferencia es whatsapp", async () => {
    const sendEmail = vi.fn();
    const r = await resolverEnvio(
      { ...newsletterOk, sector: "metalúrgica", preferencia: "whatsapp" },
      {
        ...contacto,
        email: "hola@firmind.com",
        whatsapp: "5491112345678",
      },
      { sendEmail },
    );
    expect(r.kind).toBe("whatsapp");
    expect(sendEmail).not.toHaveBeenCalled();
    if (r.kind === "whatsapp") {
      const decoded = decodeURIComponent(r.url);
      expect(decoded).toContain("https://wa.me/5491112345678?text=");
      expect(decoded).toContain("Ana Pérez");
      expect(decoded).toContain("ana@acme.com");
      expect(decoded).toContain("metalúrgica");
      expect(decoded).toContain("suscribirme al boletín de industria");
    }
  });

  it("newsletter usa email aunque haya WhatsApp si la preferencia es email", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const r = await resolverEnvio(
      newsletterOk,
      {
        ...contacto,
        email: "hola@firmind.com",
        whatsapp: "5491112345678",
      },
      { sendEmail },
    );
    expect(r).toEqual({ kind: "emailed" });
    expect(sendEmail).toHaveBeenCalledOnce();
  });

  it("emailed si newsletter + email + sendEmail y no hay WhatsApp", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const r = await resolverEnvio(
      newsletterOk,
      { ...contacto, email: "hola@firmind.com" },
      { sendEmail },
    );
    expect(r).toEqual({ kind: "emailed" });
    expect(sendEmail).toHaveBeenCalledWith({
      to: "hola@firmind.com",
      subject: "Boletín de Industria — Ana Pérez",
      text: formatConsultaText(newsletterOk),
    });
  });

  it("newsletter con preferencia email usa mailto si hay casilla y no hay Resend", async () => {
    const r = await resolverEnvio(
      newsletterOk,
      { ...contacto, email: "hola@firmind.com.ar" },
      {},
    );
    expect(r.kind).toBe("mailto");
    if (r.kind === "mailto") {
      expect(r.url).toContain("mailto:hola@firmind.com.ar");
      expect(decodeURIComponent(r.url)).toContain("Boletín de Industria");
    }
  });

  it("consulta por email usa mailto si hay casilla y no hay Resend", async () => {
    const r = await resolverEnvio(
      {
        tipo: "consulta",
        empresa: "Acme SA",
        nombre: "Ana Pérez",
        email: "ana@acme.com",
        mensaje: "Consulta sobre OEE.",
      },
      { ...contacto, email: "hola@firmind.com.ar" },
      {},
    );
    expect(r.kind).toBe("mailto");
    if (r.kind === "mailto") {
      expect(r.url).toContain("mailto:hola@firmind.com.ar");
      expect(decodeURIComponent(r.url)).toContain("Consulta sobre OEE.");
      expect(decodeURIComponent(r.url)).toContain("Acme SA");
    }
  });

  it("provider_error si sendEmail rechaza", async () => {
    const sendEmail = vi.fn().mockRejectedValue(new Error("smtp down"));
    const r = await resolverEnvio(
      newsletterOk,
      { ...contacto, email: "hola@firmind.com" },
      { sendEmail },
    );
    expect(r).toEqual({ kind: "provider_error" });
  });
});

describe("buildWhatsAppUrl", () => {
  it("encodea el texto", () => {
    expect(buildWhatsAppUrl("54911", "Hola mundo")).toBe(
      "https://wa.me/54911?text=Hola%20mundo",
    );
  });
});

describe("formatConsultaText", () => {
  it("incluye empresa y tipo", () => {
    const text = formatConsultaText(presupuestoOk);
    expect(text).toContain("Acme SA");
    expect(text).toContain("presupuesto");
  });

  it("consulta incluye empresa del cliente", () => {
    const text = formatConsultaText({
      tipo: "consulta",
      empresa: "Acme SA",
      nombre: "Ana Pérez",
      email: "ana@acme.com",
      mensaje: "Consulta sobre OEE.",
    });
    expect(text).toContain("Empresa: Acme SA");
    expect(text).toContain("consulta");
  });
});
