import type { ContactoConfig } from "./contacto";
import { SERVICIO_OTRO, slugsServicios } from "./servicios";

export type PreferenciaRespuesta = "email" | "whatsapp";

export type PresupuestoPayload = {
  tipo: "presupuesto";
  empresa: string;
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  planta: string;
  servicio: string;
  mensaje: string;
  preferencia: PreferenciaRespuesta;
};

export type NewsletterPayload = {
  tipo: "newsletter";
  nombre: string;
  email: string;
  sector: string;
};

export type ConsultaPayload = PresupuestoPayload | NewsletterPayload;
export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR_REQUERIDO = "Completá este campo.";
const ERROR_EMAIL = "Ingresá un email válido.";
const ERROR_MENSAJE = "El mensaje no puede superar 2000 caracteres.";

function asRecord(body: unknown): Record<string, unknown> | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }
  return body as Record<string, unknown>;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateEmailField(email: string, errors: FieldErrors) {
  if (!email) {
    errors.email = ERROR_REQUERIDO;
  } else if (!EMAIL_RE.test(email)) {
    errors.email = ERROR_EMAIL;
  }
}

export function validateConsulta(
  body: unknown,
): { ok: true; data: ConsultaPayload } | { ok: false; errors: FieldErrors } {
  const rec = asRecord(body);
  if (!rec) {
    return { ok: false, errors: { tipo: ERROR_REQUERIDO } };
  }

  if (rec.tipo === "presupuesto") {
    const errors: FieldErrors = {};
    const empresa = readString(rec.empresa);
    const nombre = readString(rec.nombre);
    const cargo = readString(rec.cargo);
    const email = readString(rec.email);
    const telefono = readString(rec.telefono);
    const planta = readString(rec.planta);
    const servicio = readString(rec.servicio);
    const mensaje = readString(rec.mensaje);
    const preferenciaRaw = readString(rec.preferencia);

    if (!empresa) errors.empresa = ERROR_REQUERIDO;
    if (!nombre) errors.nombre = ERROR_REQUERIDO;
    if (!cargo) errors.cargo = ERROR_REQUERIDO;
    validateEmailField(email, errors);
    if (!telefono) errors.telefono = ERROR_REQUERIDO;
    if (!planta) errors.planta = ERROR_REQUERIDO;

    const slugs = slugsServicios();
    if (!servicio || (servicio !== SERVICIO_OTRO && !slugs.includes(servicio))) {
      errors.servicio = ERROR_REQUERIDO;
    }

    if (!mensaje) {
      errors.mensaje = ERROR_REQUERIDO;
    } else if (mensaje.length > 2000) {
      errors.mensaje = ERROR_MENSAJE;
    }

    let preferencia: PreferenciaRespuesta | "" = "";
    if (preferenciaRaw === "email" || preferenciaRaw === "whatsapp") {
      preferencia = preferenciaRaw;
    } else {
      errors.preferencia = ERROR_REQUERIDO;
    }

    if (Object.keys(errors).length > 0 || preferencia === "") {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: {
        tipo: "presupuesto",
        empresa,
        nombre,
        cargo,
        email,
        telefono,
        planta,
        servicio,
        mensaje,
        preferencia,
      },
    };
  }

  if (rec.tipo === "newsletter") {
    const errors: FieldErrors = {};
    const nombre = readString(rec.nombre);
    const email = readString(rec.email);
    const sector = typeof rec.sector === "string" ? rec.sector.trim() : "";

    if (!nombre) errors.nombre = ERROR_REQUERIDO;
    validateEmailField(email, errors);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return { ok: true, data: { tipo: "newsletter", nombre, email, sector } };
  }

  return { ok: false, errors: { tipo: ERROR_REQUERIDO } };
}

export function formatConsultaText(data: ConsultaPayload): string {
  if (data.tipo === "presupuesto") {
    return [
      "Tipo: presupuesto",
      `Empresa: ${data.empresa}`,
      `Nombre: ${data.nombre}`,
      `Cargo: ${data.cargo}`,
      `Email: ${data.email}`,
      `Teléfono: ${data.telefono}`,
      `Planta: ${data.planta}`,
      `Servicio: ${data.servicio}`,
      `Mensaje: ${data.mensaje}`,
      `Preferencia: ${data.preferencia}`,
    ].join("\n");
  }

  return [
    "Tipo: newsletter",
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Sector: ${data.sector}`,
  ].join("\n");
}

export function buildWhatsAppUrl(phoneE164: string, text: string): string {
  return `https://wa.me/${phoneE164.trim()}?text=${encodeURIComponent(text)}`;
}

export type SendEmail = (args: {
  to: string;
  subject: string;
  text: string;
}) => Promise<void>;

export type EnvioResultado =
  | { kind: "emailed" }
  | { kind: "whatsapp"; url: string }
  | { kind: "queued" }
  | { kind: "provider_error" };

export async function resolverEnvio(
  data: ConsultaPayload,
  contacto: ContactoConfig,
  opts: { sendEmail?: SendEmail; log?: (data: ConsultaPayload) => void },
): Promise<EnvioResultado> {
  const text = formatConsultaText(data);
  const emailDestino = contacto.email.trim();
  const whatsapp = contacto.whatsapp.trim();
  const intentaEmail =
    data.tipo === "newsletter" ||
    (data.tipo === "presupuesto" && data.preferencia === "email");

  if (intentaEmail) {
    if (emailDestino && opts.sendEmail) {
      try {
        const subject =
          data.tipo === "presupuesto"
            ? `Presupuesto — ${data.empresa}`
            : `Newsletter — ${data.nombre}`;
        await opts.sendEmail({ to: emailDestino, subject, text });
        return { kind: "emailed" };
      } catch {
        return { kind: "provider_error" };
      }
    }
  }

  const intentaWhatsapp =
    (data.tipo === "presupuesto" && data.preferencia === "whatsapp") ||
    intentaEmail;

  if (intentaWhatsapp && whatsapp) {
    return { kind: "whatsapp", url: buildWhatsAppUrl(whatsapp, text) };
  }

  opts.log?.(data);
  return { kind: "queued" };
}
