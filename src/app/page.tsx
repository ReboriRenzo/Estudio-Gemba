import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { MethodSteps } from "@/components/MethodSteps";
import { NewsletterSection } from "@/components/NewsletterSection";
import { ServiceGrid } from "@/components/ServiceGrid";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";

export default function HomePage() {
  return (
    <>
      <div className="flex h-[calc(100svh-var(--dev-banner-h))] flex-col">
        <section className="relative min-h-0 flex-1 overflow-hidden bg-navy text-white">
        <Image
          src="/home/hero.png"
          alt="Nave industrial: el diagnóstico de Estudio Gemba empieza en planta"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy/50 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-6 pt-6 md:pb-10 md:pt-8">
          <p className="text-xs uppercase tracking-[0.32em] text-white/80">
            Estudio técnico · Buenos Aires
          </p>
          <h1 className="hero-in mt-4 max-w-4xl text-2xl font-medium uppercase tracking-[0.12em] sm:text-3xl md:mt-5 md:text-6xl md:leading-[1.08]">
            Optimización de procesos con datos de planta, no con recetas
            genéricas
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 md:mt-6 md:text-lg">
            Para jefes de planta y directores de operaciones de PyMEs
            industriales que necesitan resultados medibles en la línea.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-10">
            <Link
              href="/contacto"
              className="bg-white px-6 py-3 text-sm uppercase tracking-[0.12em] text-navy"
            >
              Contacto
            </Link>
            <Link
              href="/servicios"
              className="border border-white px-6 py-3 text-sm uppercase tracking-[0.12em] text-white"
            >
              Ver servicios
            </Link>
          </div>
        </div>
        </section>

        <VocabularioMarquee />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em]">Líneas de trabajo</p>
            <h2 className="mt-3 text-2xl font-medium uppercase tracking-[0.14em] md:text-3xl">
              Servicios
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed">
            Cinco intervenciones para la planta: diagnosticar, reducir pérdidas,
            cambiar más rápido, ordenar el piso e implementar.
          </p>
        </div>
        <div className="mt-12">
          <ServiceGrid variant="home" />
        </div>
      </section>

      <section className="border-y border-navy/15 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs uppercase tracking-[0.22em]">Cómo se trabaja</p>
          <h2 className="mt-3 mb-10 text-2xl font-medium uppercase tracking-[0.14em] md:text-3xl">
            Método
          </h2>
          <MethodSteps />
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[480px]">
            <Image
              src="/home/estudio.png"
              alt="Estructura industrial: el estudio se lee en la geometría de la planta"
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">El estudio</p>
            <h2 className="mt-3 text-2xl font-medium uppercase tracking-[0.14em]">
              Ingeniería en el piso, no en el PowerPoint
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              Estudio Gemba trabaja con PyMEs industriales de Buenos Aires, Zona
              Sur, y en el resto del país bajo coordinación. El punto de partida
              es Gemba: OEE, scrap y tiempos muertos, antes de cualquier
              herramienta.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              No vendemos un programa genérico de mejora continua.
              Diagnosticamos, priorizamos e implementamos con el equipo de
              planta.
            </p>
            <Link
              href="/sobre-nosotros"
              className="mt-8 inline-block w-fit border-b border-navy text-sm uppercase tracking-[0.12em]"
            >
              Sobre nosotros
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title="Hablemos de tu planta" href="/contacto" />

      <NewsletterSection />
    </>
  );
}
