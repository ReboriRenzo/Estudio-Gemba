"use client";

import { useState, type FormEvent } from "react";

type NewsletterFormProps = {
  variant: "page" | "footer";
};

type FieldErrors = Record<string, string>;

const ERROR_ENVIO =
  "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.";
const EXITO_QUEUED =
  "Recibimos tus datos. Cuando el canal de contacto esté activo, te responderemos.";
const EXITO_EMAIL = "Recibimos tu consulta. Te respondemos por email.";

export function NewsletterForm({ variant }: NewsletterFormProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
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
        }),
      });

      const json: {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
        queued?: boolean;
        emailed?: boolean;
        whatsappUrl?: string;
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
        window.open(json.whatsappUrl, "_blank", "noopener,noreferrer");
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
