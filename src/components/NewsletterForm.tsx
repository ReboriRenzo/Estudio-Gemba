"use client";

import { useState, type FormEvent } from "react";
import { canalDesdeContacto } from "@/lib/consulta";

type FieldErrors = Record<string, string>;

const ERROR_ENVIO =
  "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.";
const EXITO_QUEUED =
  "Recibimos tus datos. Cuando el canal de contacto esté activo, te responderemos.";
const EXITO_EMAIL = "Recibimos tu consulta. Te respondemos por email.";
const EXITO_MAILTO = "Se abrió tu cliente de correo con la suscripción.";
const EXITO_WPP =
  "Te abrimos WhatsApp con tus datos para coordinar la suscripción.";

export function NewsletterForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const canal = canalDesdeContacto(email);
  const fieldClass =
    "mt-1 w-full rounded-none border border-navy bg-white px-3 py-2 text-sm text-navy";
  const labelClass = "text-sm text-navy";
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
          sector,
          preferencia: canal || undefined,
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
    return <p className="text-sm text-navy">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div>
        <label htmlFor="newsletter-nombre" className={labelClass}>
          Nombre
        </label>
        <input
          id="newsletter-nombre"
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
        <label htmlFor="newsletter-email" className={labelClass}>
          Email/WhatsApp
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="text"
          inputMode={canal === "whatsapp" ? "tel" : "email"}
          autoComplete={canal === "whatsapp" ? "tel" : "email"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
        {errors.email ? <p className={errorClass}>{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="newsletter-sector" className={labelClass}>
          Sector/rubro industrial (opcional)
        </label>
        <input
          id="newsletter-sector"
          name="sector"
          type="text"
          value={sector}
          onChange={(event) => setSector(event.target.value)}
          className={fieldClass}
        />
      </div>
      {status === "error" ? <p className={errorClass}>{message}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit border border-navy bg-navy px-6 py-3 text-sm uppercase tracking-[0.12em] text-white transition-colors hover:bg-transparent hover:text-navy disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando…" : "Suscribirme"}
      </button>
    </form>
  );
}
