import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { MethodSteps } from "@/components/MethodSteps";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ServiceCard } from "@/components/ServiceCard";
import { slugsServicios } from "@/lib/servicios";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-navy/15">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20">
          <p className="text-xs uppercase tracking-[0.28em]">
            Estudio técnico · Buenos Aires
          </p>
          <h1 className="hero-in mt-6 max-w-4xl text-3xl font-medium uppercase tracking-[0.12em] md:text-5xl md:leading-tight">
            Optimización de procesos con datos de planta, no con recetas
            genéricas
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Para jefes de planta y directores de operaciones de PyMEs
            industriales que necesitan resultados medibles en la línea.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="bg-navy px-6 py-3 text-sm uppercase tracking-[0.12em] text-white"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/servicios"
              className="border border-navy px-6 py-3 text-sm uppercase tracking-[0.12em]"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {["OEE", "Scrap", "Tiempos muertos", "Disponibilidad"].map((term) => (
            <p
              key={term}
              className="text-sm uppercase tracking-[0.2em]"
            >
              {term}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-medium uppercase tracking-[0.16em]">
          Servicios
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed">
          Cinco líneas de trabajo para intervenir la planta con números, no con
          teoría.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slugsServicios().map((slug) => (
            <ServiceCard key={slug} slug={slug} variant="home" />
          ))}
        </div>
      </section>

      <section className="border-y border-navy/15 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-10 text-2xl font-medium uppercase tracking-[0.16em]">
            Método
          </h2>
          <MethodSteps />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-medium uppercase tracking-[0.16em]">
          Estudio técnico
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed">
          Estudio Gemba trabaja con PyMEs industriales de Buenos Aires, Zona
          Sur, y en el resto del país bajo coordinación. El punto de partida es
          el piso: OEE, scrap y tiempos muertos, antes de cualquier herramienta.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed">
          No vendemos un programa genérico de mejora continua. Diagnosticamos,
          priorizamos e implementamos con el equipo de planta.
        </p>
        <Link
          href="/sobre-nosotros"
          className="mt-6 inline-block border-b border-navy text-sm uppercase tracking-[0.12em]"
        >
          Sobre nosotros
        </Link>
      </section>

      <CtaBand
        title="Solicitá un presupuesto para tu planta"
        href="/contacto"
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-medium uppercase tracking-[0.16em]">
          Newsletter
        </h2>
        <p className="mt-4 mb-8 max-w-xl text-base leading-relaxed">
          Notas breves sobre diagnóstico de planta y seguimiento de indicadores.
        </p>
        <div className="max-w-md">
          <NewsletterForm variant="page" />
        </div>
      </section>
    </>
  );
}
