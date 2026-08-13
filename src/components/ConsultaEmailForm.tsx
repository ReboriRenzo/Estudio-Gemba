"use client";

import { useState, type FormEvent } from "react";

type FieldErrors = Record<string, string>;

const ERROR_ENVIO =
  "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.";
const EXITO_QUEUED =
  "Recibimos tu consulta. Cuando el email esté activo, te respondemos.";
const EXITO_EMAIL = "Recibimos tu consulta. Te respondemos por email.";
const EXITO_MAILTO = "Se abrió tu cliente de correo con la consulta.";

export function ConsultaEmailForm() {
  const [empresa, setEmpresa] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function fieldClass(name: string) {
    return errors[name]
      ? "mt-1 w-full rounded-none border-2 border-navy bg-white px-3 py-2 text-sm"
      : "mt-1 w-full rounded-none border border-navy/40 bg-white px-3 py-2 text-sm";
  }

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
          tipo: "consulta",
          empresa,
          nombre,
          email,
          mensaje,
        }),
      });

      const json: {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
        queued?: boolean;
        emailed?: boolean;
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
    return <p className="border border-navy/20 p-6 text-sm leading-relaxed">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="consulta-empresa" className="text-sm">
          Empresa
        </label>
        <input
          id="consulta-empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className={fieldClass("empresa")}
        />
        {errors.empresa ? <p className="mt-1 text-sm">{errors.empresa}</p> : null}
      </div>
      <div>
        <label htmlFor="consulta-nombre" className="text-sm">
          Nombre
        </label>
        <input
          id="consulta-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={fieldClass("nombre")}
        />
        {errors.nombre ? <p className="mt-1 text-sm">{errors.nombre}</p> : null}
      </div>
      <div>
        <label htmlFor="consulta-email" className="text-sm">
          Email
        </label>
        <input
          id="consulta-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass("email")}
        />
        {errors.email ? <p className="mt-1 text-sm">{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="consulta-mensaje" className="text-sm">
          Consulta
        </label>
        <textarea
          id="consulta-mensaje"
          name="mensaje"
          rows={6}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={fieldClass("mensaje")}
        />
        {errors.mensaje ? <p className="mt-1 text-sm">{errors.mensaje}</p> : null}
      </div>
      {status === "error" ? <p className="text-sm">{message}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-none bg-navy px-6 py-3 text-sm uppercase tracking-[0.12em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}
