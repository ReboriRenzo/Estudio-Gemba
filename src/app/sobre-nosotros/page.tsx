import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { MethodSteps } from "@/components/MethodSteps";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";
import { MARQUESINA_SOBRE } from "@/lib/marquesinas";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Estudio técnico en optimización de procesos para PyMEs industriales. Diagnóstico en planta, alcance cerrado y presencia decreciente.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <header className="relative min-h-[70vh] overflow-hidden bg-navy text-white">
        <Image
          src="/sobre/planta.png"
          alt="Nave industrial: el diagnóstico de FIRMIND se hace en planta"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/65" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-white/80">
            Estudio técnico · Buenos Aires
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-medium uppercase tracking-[0.14em] md:text-5xl md:leading-tight">
            Optimización de procesos con datos de planta, no con métodos
            genéricos
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Para dueños y directores de PyMEs industriales que quieren saber qué
            está limitando su resultado.
          </p>
        </div>
      </header>

      <VocabularioMarquee
        terms={MARQUESINA_SOBRE}
        label="Vocabulario de FIRMIND"
      />

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.22em] lg:col-span-3">
            01 — Qué es
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
              Un estudio técnico, con alcance cerrado
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed md:text-lg">
              <p>
                Somos un estudio técnico que trabaja en distintas áreas
                según lo que requiera el proyecto. El diagnóstico lo hacemos en
                planta, con medición propia.
              </p>
              <p>
                Trabajamos con alcance cerrado, criterio de éxito acordado por
                escrito y presencia decreciente: si al año seguimos siendo
                necesarios, el trabajo no cumplió su objetivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[600px]">
            <Image
              src="/sobre/matias.png"
              alt="Matías Emanuel Acuña, fundador de FIRMIND"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">
              02 — Matías Emanuel Acuña
            </p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              El diagnóstico lo hago yo, en planta
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              Ingeniero industrial. Cinco años como ingeniero de procesos
              trabajando con Lean y TPM, los últimos en Essity antes de fundar
              FIRMIND.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              Conozco el lado de adentro: las decisiones que se toman a las
              siete de la mañana con la mitad de la información, y los problemas
              que todos ven y no se resuelven.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              Cinco días completos, midiendo antes de proponer algo. Cuando el
              proyecto requiere otra especialidad, sumo al profesional que
              corresponda y lo aviso antes. No traigo un programa armado de
              antemano: traigo un método para encontrar qué está limitando el
              resultado y cuánto cuesta eso por mes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="order-2 flex flex-col justify-center py-4 lg:order-1 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">
              03 — Cómo se contrata
            </p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              Las fases se contratan por separado
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              La Fase 1 no obliga a continuar y se entrega completa aunque la
              empresa decida no avanzar. El programa integral se estructura
              sobre 12 meses, con dedicación decreciente establecida
              contractualmente desde el inicio.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              La presencia decrece por diseño. Las primeras recomendaciones son
              siempre las que no cuestan dinero. Comprar equipamiento es lo
              último, y con frecuencia resulta que no hace falta.
            </p>
          </div>
          <div className="relative order-1 min-h-[280px] overflow-hidden lg:order-2 lg:min-h-[480px]">
            <Image
              src="/sobre/gemba.png"
              alt="Celda de planta ordenada: el estándar se sostiene en el piso"
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs uppercase tracking-[0.22em]">04 — Método</p>
          <h2 className="mt-4 mb-10 text-2xl font-medium uppercase tracking-[0.12em]">
            Tres fases, presencia decreciente
          </h2>
          <MethodSteps />
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-px bg-navy/15 md:grid-cols-3">
          <article className="bg-white px-4 py-14 md:px-10">
            <h2 className="text-sm uppercase tracking-[0.18em]">Para quién</h2>
            <p className="mt-5 text-base leading-relaxed">
              Dueños y directores de PyMEs industriales que quieren saber qué
              está limitando su resultado, y cuánto cuesta eso por mes.
            </p>
          </article>
          <article className="bg-white px-4 py-14 md:px-10">
            <h2 className="text-sm uppercase tracking-[0.18em]">Garantía</h2>
            <p className="mt-5 text-base leading-relaxed">
              Si en el diagnóstico no se identifica una oportunidad verificable
              de al menos cinco veces el honorario, no se factura.
            </p>
          </article>
          <article className="bg-white px-4 py-14 md:px-10">
            <h2 className="text-sm uppercase tracking-[0.18em]">Qué no hacemos</h2>
            <p className="mt-5 text-base leading-relaxed">
              Si después del diagnóstico el problema resulta ser comercial o
              financiero y no operativo, lo decimos y no se factura. No
              vendemos un programa armado de antemano.
            </p>
          </article>
        </div>
      </section>

      <CtaBand title="Si la planta necesita números, hablemos" href="/contacto" />
    </>
  );
}
