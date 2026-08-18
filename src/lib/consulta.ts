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
  preferencia: PreferenciaRespuesta;
};

export type ConsultaEmailPayload = {
  tipo: "consulta";
  empresa: string;
  nombre: string;
  email: string;
  mensaje: string;
};

export type ConsultaPayload =
  | PresupuestoPayload
  | NewsletterPayload
  | ConsultaEmailPayload;
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

function readPreferencia(
  value: unknown,
  errors: FieldErrors,
): PreferenciaRespuesta | "" {
  const raw = readString(value);
  if (raw === "email" || raw === "whatsapp") return raw;
  errors.preferencia = ERROR_REQUERIDO;
  return "";
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
    const preferencia = readPreferencia(rec.preferencia, errors);

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
    const preferencia = readPreferencia(rec.preferencia, errors);

    if (!nombre) errors.nombre = ERROR_REQUERIDO;
    validateEmailField(email, errors);

    if (Object.keys(errors).length > 0 || preferencia === "") {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: { tipo: "newsletter", nombre, email, sector, preferencia },
    };
  }

  if (rec.tipo === "consulta") {
    const errors: FieldErrors = {};
    const empresa = readString(rec.empresa);
    const nombre = readString(rec.nombre);
    const email = readString(rec.email);
    const mensaje = readString(rec.mensaje);

    if (!empresa) errors.empresa = ERROR_REQUERIDO;
    if (!nombre) errors.nombre = ERROR_REQUERIDO;
    validateEmailField(email, errors);
    if (!mensaje) {
      errors.mensaje = ERROR_REQUERIDO;
    } else if (mensaje.length > 2000) {
      errors.mensaje = ERROR_MENSAJE;
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: { tipo: "consulta", empresa, nombre, email, mensaje },
    };
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

  if (data.tipo === "newsletter") {
    return formatNewsletterWhatsApp(data);
  }

  return [
    "Tipo: consulta",
    `Empresa: ${data.empresa}`,
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Mensaje: ${data.mensaje}`,
  ].join("\n");
}

export function formatNewsletterWhatsApp(data: NewsletterPayload): string {
  const canal = data.preferencia === "whatsapp" ? "WhatsApp" : "email";
  const lineas = [
    "Hola, quiero suscribirme al boletín de industria de FIRMIND.",
    "",
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
  ];
  if (data.sector) {
    lineas.push(`Sector: ${data.sector}`);
  }
  lineas.push(`Canal: ${canal}`);
  lineas.push("", "Quedo atento para coordinar por acá.");
  return lineas.join("\n");
}

export function buildWhatsAppUrl(phoneE164: string, text: string): string {
  return `https://wa.me/${phoneE164.trim()}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoUrl(to: string, subject: string, text: string): string {
  return `mailto:${to.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

export type SendEmail = (args: {
  to: string;
  subject: string;
  text: string;
}) => Promise<void>;

export type EnvioResultado =
  | { kind: "emailed" }
  | { kind: "whatsapp"; url: string }
  | { kind: "mailto"; url: string }
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

  if (data.tipo === "newsletter") {
    const text = formatNewsletterWhatsApp(data);

    if (data.preferencia === "whatsapp") {
      if (whatsapp) {
        return { kind: "whatsapp", url: buildWhatsAppUrl(whatsapp, text) };
      }
      opts.log?.(data);
      return { kind: "queued" };
    }

    const subject = `Boletín de Industria — ${data.nombre}`;
    if (emailDestino && opts.sendEmail) {
      try {
        await opts.sendEmail({ to: emailDestino, subject, text });
        return { kind: "emailed" };
      } catch {
        return { kind: "provider_error" };
      }
    }
    if (emailDestino) {
      return { kind: "mailto", url: buildMailtoUrl(emailDestino, subject, text) };
    }
    opts.log?.(data);
    return { kind: "queued" };
  }

  if (data.tipo === "consulta") {
    const subject = `Consulta — ${data.empresa}`;
    if (emailDestino && opts.sendEmail) {
      try {
        await opts.sendEmail({ to: emailDestino, subject, text });
        return { kind: "emailed" };
      } catch {
        return { kind: "provider_error" };
      }
    }
    if (emailDestino) {
      return {
        kind: "mailto",
        url: buildMailtoUrl(emailDestino, subject, text),
      };
    }
    opts.log?.(data);
    return { kind: "queued" };
  }

  const intentaEmail = data.preferencia === "email";

  if (intentaEmail) {
    if (emailDestino && opts.sendEmail) {
      try {
        await opts.sendEmail({
          to: emailDestino,
          subject: `Presupuesto — ${data.empresa}`,
          text,
        });
        return { kind: "emailed" };
      } catch {
        return { kind: "provider_error" };
      }
    }
  }

  const intentaWhatsapp = data.preferencia === "whatsapp" || intentaEmail;

  if (intentaWhatsapp && whatsapp) {
    return { kind: "whatsapp", url: buildWhatsAppUrl(whatsapp, text) };
  }

  opts.log?.(data);
  return { kind: "queued" };
}
