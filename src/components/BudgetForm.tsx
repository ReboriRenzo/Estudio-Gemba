"use client";

import { useState, type FormEvent } from "react";
import { canalesDisponibles, contacto } from "@/lib/contacto";
import { SERVICIO_OTRO, SERVICIOS } from "@/lib/servicios";

type FieldErrors = Record<string, string>;

const ERROR_ENVIO =
  "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.";
const EXITO_QUEUED =
  "Recibimos tus datos. Cuando el canal de contacto esté activo, te responderemos.";
const EXITO_EMAIL = "Recibimos tu consulta. Te respondemos por email.";

const slugsValidos = new Set([
  ...SERVICIOS.map((s) => s.slug),
  SERVICIO_OTRO,
]);

export function BudgetForm({ servicioInicial }: { servicioInicial?: string }) {
  const canales = canalesDisponibles(contacto);
  const servicioDefault =
    servicioInicial && slugsValidos.has(servicioInicial)
      ? servicioInicial
      : "";

  const [empresa, setEmpresa] = useState("");
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [planta, setPlanta] = useState("");
  const [servicio, setServicio] = useState(servicioDefault);
  const [mensaje, setMensaje] = useState("");
  const [preferencia, setPreferencia] = useState<"email" | "whatsapp">("email");
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
    return <p className="border border-navy/20 p-6 text-sm leading-relaxed">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field
        id="empresa"
        label="Empresa"
        value={empresa}
        onChange={setEmpresa}
        error={errors.empresa}
        className={fieldClass("empresa")}
      />
      <Field
        id="nombre"
        label="Nombre y apellido"
        value={nombre}
        onChange={setNombre}
        error={errors.nombre}
        className={fieldClass("nombre")}
        autoComplete="name"
      />
      <Field
        id="cargo"
        label="Cargo"
        value={cargo}
        onChange={setCargo}
        error={errors.cargo}
        className={fieldClass("cargo")}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        className={fieldClass("email")}
        autoComplete="email"
      />
      <Field
        id="telefono"
        label="Teléfono"
        type="tel"
        value={telefono}
        onChange={setTelefono}
        error={errors.telefono}
        className={fieldClass("telefono")}
        autoComplete="tel"
      />
      <Field
        id="planta"
        label="Planta / localidad"
        value={planta}
        onChange={setPlanta}
        error={errors.planta}
        className={fieldClass("planta")}
      />

      <div>
        <label htmlFor="servicio" className="text-sm">
          Servicio de interés
        </label>
        <select
          id="servicio"
          name="servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className={fieldClass("servicio")}
        >
          <option value="">Seleccioná un servicio</option>
          {SERVICIOS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.titulo}
            </option>
          ))}
          <option value={SERVICIO_OTRO}>No estoy seguro</option>
        </select>
        {errors.servicio ? (
          <p className="mt-1 text-sm">{errors.servicio}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="mensaje" className="text-sm">
          Mensaje / necesidad
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={fieldClass("mensaje")}
        />
        {errors.mensaje ? (
          <p className="mt-1 text-sm">{errors.mensaje}</p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm">Preferencia de respuesta</legend>
        <div className="mt-2 flex flex-col gap-2 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="preferencia"
              value="email"
              checked={preferencia === "email"}
              onChange={() => setPreferencia("email")}
            />
            Email
          </label>
          {canales.whatsapp ? (
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="preferencia"
                value="whatsapp"
                checked={preferencia === "whatsapp"}
                onChange={() => setPreferencia("whatsapp")}
              />
              WhatsApp
            </label>
          ) : null}
        </div>
      </fieldset>

      {status === "error" ? <p className="text-sm">{message}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-none bg-navy px-6 py-3 text-sm uppercase tracking-[0.12em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando…" : "Solicitar presupuesto"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  className,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
      {error ? <p className="mt-1 text-sm">{error}</p> : null}
    </div>
  );
}
