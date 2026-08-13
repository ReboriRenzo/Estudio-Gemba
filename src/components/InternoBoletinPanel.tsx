"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { NoticiaBoletin } from "@/lib/boletin";

type FieldErrors = Record<string, string>;

export function InternoBoletinPanel() {
  const [sesion, setSesion] = useState(false);
  const [listo, setListo] = useState(false);
  const [clave, setClave] = useState("");
  const [tituloArchivo, setTituloArchivo] = useState("");
  const [fechaArchivo, setFechaArchivo] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [archivoKey, setArchivoKey] = useState(0);
  const [noticias, setNoticias] = useState<NoticiaBoletin[]>([]);
  const [errorsArchivo, setErrorsArchivo] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/boletin");
      const json: { ok?: boolean; sesion?: boolean; noticias?: NoticiaBoletin[] } =
        await res.json();
      if (json.ok && json.sesion) {
        setSesion(true);
        setNoticias(json.noticias ?? []);
      }
      setListo(true);
    })();
  }, []);

  async function post(body: Record<string, unknown>) {
    const res = await fetch("/api/boletin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json: {
      ok?: boolean;
      sesion?: boolean;
      noticias?: NoticiaBoletin[];
      errors?: FieldErrors;
      message?: string;
    } = await res.json();
    return { res, json };
  }

  async function onEntrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const { json } = await post({ accion: "entrar", clave });
    setStatus("idle");
    if (json.ok && json.sesion) {
      setSesion(true);
      setNoticias(json.noticias ?? []);
      setClave("");
      return;
    }
    setMessage(json.message ?? "No se pudo entrar.");
  }

  async function onAgregarArchivo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorsArchivo({});
    setMessage("");
    const form = new FormData();
    form.append("accion", "archivo");
    form.append("titulo", tituloArchivo);
    form.append("fecha", fechaArchivo);
    if (archivo) form.append("archivo", archivo);
    const res = await fetch("/api/boletin", { method: "POST", body: form });
    const json: {
      ok?: boolean;
      noticias?: NoticiaBoletin[];
      errors?: FieldErrors;
      message?: string;
    } = await res.json();
    setStatus("idle");
    if (res.status === 400 && json.errors) {
      setErrorsArchivo(json.errors);
      return;
    }
    if (!json.ok) {
      setMessage(json.message ?? "No se pudo guardar.");
      return;
    }
    setNoticias(json.noticias ?? []);
    setTituloArchivo("");
    setFechaArchivo("");
    setArchivo(null);
    setArchivoKey((n) => n + 1);
  }

  async function onQuitar(id: string) {
    setMessage("");
    const { json } = await post({ accion: "quitar", id });
    if (!json.ok) {
      setMessage(json.message ?? "No se pudo quitar.");
      return;
    }
    setNoticias(json.noticias ?? []);
  }

  async function onSalir() {
    await post({ accion: "salir" });
    setSesion(false);
    setNoticias([]);
  }

  const field =
    "mt-1 w-full rounded-none border border-navy/40 bg-white px-3 py-2 text-sm";

  if (!listo) {
    return <p className="text-sm">Cargando…</p>;
  }

  if (!sesion) {
    return (
      <form onSubmit={onEntrar} className="mx-auto flex max-w-sm flex-col gap-4">
        <p className="text-sm leading-relaxed">
          Panel del boletín. Definí la clave en{" "}
          <code className="text-xs">src/lib/boletin.ts</code> y no compartas
          esta dirección.
        </p>
        <div>
          <label htmlFor="interno-clave" className="text-sm">
            Clave
          </label>
          <input
            id="interno-clave"
            type="password"
            autoComplete="current-password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className={field}
          />
        </div>
        {message ? <p className="text-sm">{message}</p> : null}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-navy px-4 py-2 text-sm uppercase tracking-[0.12em] text-white disabled:opacity-60"
        >
          {status === "submitting" ? "Entrando…" : "Entrar"}
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">
          Sesión abierta. Publicá o eliminá archivos. Salen en /newsletter.
        </p>
        <button
          type="button"
          onClick={() => void onSalir()}
          className="border border-navy px-4 py-2 text-sm uppercase tracking-[0.12em]"
        >
          Salir
        </button>
      </div>

      {message ? <p className="text-sm">{message}</p> : null}

      <form
        onSubmit={onAgregarArchivo}
        className="flex flex-col gap-4 border border-navy/20 p-6"
      >
        <h2 className="text-sm uppercase tracking-[0.18em]">Publicar archivo</h2>
        <p className="text-sm leading-relaxed">
          PDF, Word, Excel, imagen u otro documento. Al hacer clic en el boletín
          se descarga. Máximo 15 MB.
        </p>
        <div>
          <label htmlFor="arch-titulo" className="text-sm">
            Título
          </label>
          <input
            id="arch-titulo"
            value={tituloArchivo}
            onChange={(e) => setTituloArchivo(e.target.value)}
            className={field}
          />
          {errorsArchivo.titulo ? (
            <p className="mt-1 text-sm">{errorsArchivo.titulo}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="arch-file" className="text-sm">
            Archivo
          </label>
          <input
            id="arch-file"
            key={archivoKey}
            type="file"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
            className={field}
          />
          {errorsArchivo.archivo ? (
            <p className="mt-1 text-sm">{errorsArchivo.archivo}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="arch-fecha" className="text-sm">
            Fecha (opcional)
          </label>
          <input
            id="arch-fecha"
            type="date"
            value={fechaArchivo}
            onChange={(e) => setFechaArchivo(e.target.value)}
            className={field}
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-fit bg-navy px-4 py-2 text-sm uppercase tracking-[0.12em] text-white disabled:opacity-60"
        >
          {status === "submitting" ? "Subiendo…" : "Publicar archivo"}
        </button>
      </form>

      <section>
        <h2 className="text-sm uppercase tracking-[0.18em]">Publicadas</h2>
        {noticias.length === 0 ? (
          <p className="mt-4 text-sm">Todavía no hay archivos.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-px bg-navy/15">
            {noticias.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="mt-1 text-sm font-medium">{item.titulo}</p>
                  <p className="mt-1 text-xs tracking-[0.08em] break-all text-navy/70">
                    {item.nombreArchivo}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void onQuitar(item.id)}
                  className="w-fit border border-navy px-3 py-1.5 text-xs uppercase tracking-[0.12em]"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
