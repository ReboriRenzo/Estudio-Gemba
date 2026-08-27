import Image from "next/image";
import Link from "next/link";
import { BotonSitio } from "@/components/BotonSitio";
import { CtaBand } from "@/components/CtaBand";
import { MethodSteps } from "@/components/MethodSteps";
import { NewsletterSection } from "@/components/NewsletterSection";
import { ServiceGrid } from "@/components/ServiceGrid";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-[calc(100svh-var(--dev-banner-h))] flex-col">
        <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-navy text-white">
        <Image
          src="/home/hero.png"
          alt="Nave industrial: el diagnóstico de FIRMIND empieza en planta"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy/50 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start px-4 pb-6 pt-28 md:justify-end md:pb-10 md:pt-36 lg:pt-40">
          <p className="text-xs uppercase tracking-[0.32em] text-white/80">
            Estudio técnico · Buenos Aires
          </p>
          <h1 className="hero-in mt-4 max-w-4xl text-2xl font-medium uppercase tracking-[0.08em] break-words sm:text-3xl md:mt-5 md:text-6xl md:leading-[1.08] md:tracking-[0.12em]">
            Optimización de procesos con datos de planta, no con métodos
            genéricos
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 md:mt-6 md:text-lg">
            Para dueños y directores de PyMEs industriales que quieren saber qué
            está limitando su resultado.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-10">
            <BotonSitio href="/contacto">Contacto</BotonSitio>
            <BotonSitio href="/servicios" tono="outline">
              Ver servicios
            </BotonSitio>
          </div>
        </div>
        </section>

        <VocabularioMarquee />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em]">Tres fases</p>
            <h2 className="mt-3 text-2xl font-medium uppercase tracking-[0.14em] md:text-3xl">
              Servicios
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed">
            Diagnóstico, ejecución y autonomía. Se contratan por separado. El
            diagnóstico no obliga a continuar.
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
              FIRMIND es una red de especialistas. El diagnóstico se hace
              en planta, con medición propia, alcance cerrado y criterio de
              éxito acordado por escrito.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              Presencia decreciente: si al año seguimos siendo necesarios, el
              trabajo no cumplió su objetivo.
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
