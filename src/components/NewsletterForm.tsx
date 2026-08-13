"use client";

import { useState, type FormEvent } from "react";
import type { PreferenciaRespuesta } from "@/lib/consulta";

type NewsletterFormProps = {
  variant: "page" | "footer";
};

type FieldErrors = Record<string, string>;

const ERROR_ENVIO =
  "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.";
const EXITO_QUEUED =
  "Recibimos tus datos. Cuando el canal de contacto esté activo, te responderemos.";
const EXITO_EMAIL = "Recibimos tu consulta. Te respondemos por email.";
const EXITO_MAILTO = "Se abrió tu cliente de correo con la suscripción.";
const EXITO_WPP =
  "Te abrimos WhatsApp con tus datos para coordinar la suscripción.";

export function NewsletterForm({ variant }: NewsletterFormProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [preferencia, setPreferencia] = useState<PreferenciaRespuesta>("email");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const isFooter = variant === "footer";
  const fieldClass = isFooter
    ? "mt-1 w-full rounded-none border border-white bg-navy px-3 py-2 text-sm text-white"
    : "mt-1 w-full rounded-none border border-navy bg-white px-3 py-2 text-sm text-navy";
  const labelClass = isFooter ? "text-sm text-white" : "text-sm text-navy";
  const radioClass = isFooter ? "accent-white" : "accent-navy";
  const errorClass = "mt-1 text-sm";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/consulta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "newsletter",
          nombre,
          email,
          sector: isFooter ? "" : sector,
          preferencia,
        }),
      });

      const json: {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
        queued?: boolean;
        emailed?: boolean;
        whatsappUrl?: string;
        mailtoUrl?: string;
      } = await res.json();

      if (res.status === 400 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setMessage(json.message ?? ERROR_ENVIO);
        return;
      }

      if (json.whatsappUrl) {
        window.location.assign(json.whatsappUrl);
        setStatus("success");
        setMessage(EXITO_WPP);
        return;
      }

      if (json.mailtoUrl) {
        window.location.assign(json.mailtoUrl);
        setStatus("success");
        setMessage(EXITO_MAILTO);
        return;
      }

      setStatus("success");
      setMessage(json.emailed ? EXITO_EMAIL : EXITO_QUEUED);
    } catch {
      setStatus("error");
      setMessage(ERROR_ENVIO);
    }
  }

  if (status === "success") {
    return <p className={isFooter ? "text-sm text-white" : "text-sm text-navy"}>{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div>
        <label htmlFor={`newsletter-nombre-${variant}`} className={labelClass}>
          Nombre
        </label>
        <input
          id={`newsletter-nombre-${variant}`}
          name="nombre"
          type="text"
          autoComplete="name"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          className={fieldClass}
        />
        {errors.nombre ? <p className={errorClass}>{errors.nombre}</p> : null}
      </div>
      <div>
        <label htmlFor={`newsletter-email-${variant}`} className={labelClass}>
          Email
        </label>
        <input
          id={`newsletter-email-${variant}`}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
        {errors.email ? <p className={errorClass}>{errors.email}</p> : null}
      </div>
      {!isFooter ? (
        <div>
          <label htmlFor={`newsletter-sector-${variant}`} className={labelClass}>
            Sector / rubro industrial (opcional)
          </label>
          <input
            id={`newsletter-sector-${variant}`}
            name="sector"
            type="text"
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className={fieldClass}
          />
        </div>
      ) : null}
      <fieldset>
        <legend className={labelClass}>Contactar por</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          <label className={`inline-flex items-center gap-2 ${labelClass}`}>
            <input
              type="radio"
              name={`newsletter-preferencia-${variant}`}
              value="email"
              checked={preferencia === "email"}
              onChange={() => setPreferencia("email")}
              className={radioClass}
            />
            Email
          </label>
          <label className={`inline-flex items-center gap-2 ${labelClass}`}>
            <input
              type="radio"
              name={`newsletter-preferencia-${variant}`}
              value="whatsapp"
              checked={preferencia === "whatsapp"}
              onChange={() => setPreferencia("whatsapp")}
              className={radioClass}
            />
            WhatsApp
          </label>
        </div>
        {errors.preferencia ? (
          <p className={errorClass}>{errors.preferencia}</p>
        ) : null}
      </fieldset>
      {status === "error" ? <p className={errorClass}>{message}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={
          isFooter
            ? "rounded-none border border-white bg-white px-4 py-2 text-sm text-navy disabled:opacity-60"
            : "rounded-none bg-navy px-4 py-2 text-sm text-white disabled:opacity-60"
        }
      >
        {status === "submitting" ? "Enviando…" : "Suscribirme"}
      </button>
    </form>
  );
}
