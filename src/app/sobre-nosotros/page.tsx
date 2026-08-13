import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { MethodSteps } from "@/components/MethodSteps";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Estudio técnico de ingeniería y optimización de procesos para PyMEs industriales. Diagnóstico con OEE, scrap y tiempos muertos. Zona Sur, Buenos Aires.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <header className="relative min-h-[70vh] overflow-hidden bg-navy text-white">
        <Image
          src="/sobre/planta.png"
          alt="Nave industrial: el trabajo de Estudio Gemba empieza en el piso de planta"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/65" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-white/80">
            Estudio técnico · Zona Sur · Buenos Aires
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-medium uppercase tracking-[0.14em] md:text-5xl md:leading-tight">
            El problema se ve y se mide en Gemba
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Ingeniería práctica para PyMEs industriales. Diagnóstico numérico,
            implementación en la línea y seguimiento con indicadores reales.
          </p>
        </div>
      </header>

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.22em] lg:col-span-3">
            01 — Qué es
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
              Un estudio técnico, no una consultora de slides
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed md:text-lg">
              <p>
                Estudio Gemba se especializa en la optimización de procesos
                productivos de PyMEs industriales. El punto de partida no es un
                modelo teórico: son los datos duros de la operación — OEE, tasas
                de scrap, tiempos muertos, paradas y cuellos de botella.
              </p>
              <p>
                En lugar de aplicar soluciones genéricas, priorizamos el
                diagnóstico numérico, la ingeniería práctica y herramientas de
                mejora continua diseñadas para ingenieros, jefes de planta y
                directores de operaciones que necesitan resultados medibles en
                la línea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[480px]">
            <Image
              src="/sobre/linea.png"
              alt="Detalle de línea de producción y registros de planta"
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">02 — Por qué Gemba</p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              La planta no se entiende desde el escritorio
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              Gemba es el lugar real donde ocurre el trabajo. Ahí se ven las
              pérdidas, se contrastan los registros y se prueba lo que después
              queda como estándar. Un informe sin piso es un documento; un
              contrapunto medido en la línea es un cambio de operación.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              Por eso el estudio no vende un programa genérico de “mejora
              continua”. Primero se construye un baseline compartido. Después se
              interviene. Al final se sigue el número, no la percepción.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs uppercase tracking-[0.22em]">Vocabulario de planta</p>
          <div className="mt-8 grid gap-px bg-navy/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                term: "OEE",
                body: "Disponibilidad, rendimiento y calidad en un solo indicador de la línea.",
              },
              {
                term: "Scrap",
                body: "Merma y retrabajo que el costo esconde si no se mide con disciplina.",
              },
              {
                term: "Tiempos muertos",
                body: "Paradas, esperas y setups que comen capacidad instalada.",
              },
              {
                term: "Disponibilidad",
                body: "Tiempo en que la máquina realmente puede producir, no el tiempo teórico.",
              },
            ].map((item) => (
              <div key={item.term} className="bg-white p-6">
                <h3 className="text-sm font-medium uppercase tracking-[0.16em]">
                  {item.term}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="order-2 flex flex-col justify-center py-4 lg:order-1 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">03 — Cómo trabajamos</p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              Datos primero. Implementación después.
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              El método es deliberadamente austero: relevamiento en planta y de
              registros, mapa de pérdidas priorizado, contrapuntos en Gemba y
              cadencia de revisión con responsables de turno.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              El entregable no es un deck. Es un baseline, un plan que se puede
              ejecutar y un rutinario que la planta puede sostener cuando el
              estudio no está.
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
            Cuatro pasos, siempre los mismos
          </h2>
          <MethodSteps />
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-px bg-navy/15 md:grid-cols-3">
          <article className="bg-white px-4 py-14 md:px-10">
            <h2 className="text-sm uppercase tracking-[0.18em]">Para quién</h2>
            <p className="mt-5 text-base leading-relaxed">
              PyMEs industriales. Ingenieros, jefes de planta y directores de
              operaciones que necesitan un punto de partida medible. No un
              programa TPM corporativo para plantas ya maduras como único
              cliente.
            </p>
          </article>
          <article className="bg-white px-4 py-14 md:px-10">
            <h2 className="text-sm uppercase tracking-[0.18em]">Dónde</h2>
            <p className="mt-5 text-base leading-relaxed">
              Operamos en Zona Sur, Buenos Aires. También trabajamos en el resto
              de Argentina bajo coordinación, cuando el diagnóstico y la
              implementación lo requieren.
            </p>
          </article>
          <article className="bg-white px-4 py-14 md:px-10">
            <h2 className="text-sm uppercase tracking-[0.18em]">Qué no hacemos</h2>
            <p className="mt-5 text-base leading-relaxed">
              No aplicamos recetas genéricas, no auditamos para el informe
              cosmético y no sustituimos al equipo de planta. El cambio queda en
              quienes operan la línea.
            </p>
          </article>
        </div>
      </section>

      <CtaBand title="Si la planta necesita números, hablemos" href="/contacto" />
    </>
  );
}
