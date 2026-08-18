import type { Metadata } from "next";
import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";
import { BotonSitio } from "@/components/BotonSitio";
import { leerNoticias } from "@/lib/boletin-archivo";
import { MARQUESINA_BOLETIN } from "@/lib/marquesinas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Boletín de Industria",
  description:
    "Los datos del sector, traducidos a decisiones de planta. Una vez por mes. Suscripción gratuita.",
};

const LLEGA = [
  {
    n: "01",
    title: "Datos de sector",
    body: "Lo que mueve a la industria, traducido a una decisión que se puede tomar en planta.",
  },
  {
    n: "02",
    title: "Una vez por mes",
    body: "Una edición mensual. No una ráfaga comercial ni un resumen genérico de noticias.",
  },
  {
    n: "03",
    title: "Decisiones de planta",
    body: "Restricción, scrap, setups y capacidad ociosa: el dato sirve si cambia lo que se hace en el turno.",
  },
  {
    n: "04",
    title: "Sin ruido",
    body: "Suscripción gratuita. Coordinamos el alta por WhatsApp o email.",
  },
] as const;

const TEMAS = [
  "Eficiencia",
  "Scrap",
  "Cuellos de botella",
  "Retrabajos",
  "Tiempos muertos",
  "Setups",
  "Paros no planeados",
  "Lead time",
  "Capacidad ociosa",
  "Inventario en proceso",
] as const;

export default async function NewsletterPage() {
  const temas = [...TEMAS, ...TEMAS];
  const noticias = await leerNoticias();

  return (
    <>
      <header className="relative min-h-[70vh] overflow-hidden bg-navy text-white">
        <Image
          src="/newsletter/hero.png"
          alt="Mesa de trabajo con notas técnicas de planta"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/65" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-white/80">
            Publicación gratuita
          </p>
          <h1 className="hero-in mt-4 max-w-4xl text-3xl font-medium uppercase tracking-[0.14em] md:text-5xl md:leading-tight">
            Boletín de Industria
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Los datos del sector, traducidos a decisiones de planta. Una vez
            por mes. Suscripción gratuita, por WhatsApp o email.
          </p>
        </div>
      </header>

      <VocabularioMarquee
        terms={MARQUESINA_BOLETIN}
        label="Vocabulario del boletín"
      />

      <section className="overflow-hidden border-b border-navy/15 bg-paper">
        <div className="marquee-track py-4" aria-hidden="true">
          {temas.map((tema, index) => (
            <p
              key={`${tema}-${index}`}
              className="flex shrink-0 items-center gap-8 px-5 text-sm tracking-[0.14em] text-navy/70"
            >
              <span>{tema}</span>
              <span className="h-px w-8 bg-navy/25" />
            </p>
          ))}
        </div>
        <span className="sr-only">
          Próximas lecturas: {TEMAS.join(", ")}.
        </span>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.22em] lg:col-span-3">
            01 — Qué es
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
              Los datos del sector, traducidos a decisiones de planta
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed md:text-lg">
              <p>
                El Boletín de Industria traduce lo que mueve al sector a una
                decisión que se puede tomar en planta. Una vez por mes.
              </p>
              <p>
                Es gratuito. No es un embudo de venta ni una ráfaga semanal. Te
                suscribís y coordinamos el alta por el canal que elijas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/80">
                <span className="boletin-live h-2 w-2 rounded-full bg-white" />
                Boletín de Industria
              </p>
              <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
                Notas técnicas
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                Lecturas cortas de planta: método, indicadores y setups. Se
                publican acá para descargar.
              </p>
            </div>
            <div className="group relative h-44 overflow-hidden lg:col-span-5 lg:h-52">
              <Image
                src="/newsletter/notas.png"
                alt="Cuaderno y notas técnicas de planta sobre un escritorio industrial"
                fill
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-navy/20 transition-colors duration-500 group-hover:bg-navy/5" />
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.22em] text-white/65">
              Esta edición
            </p>
            {noticias.length === 0 ? (
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Todavía no hay notas publicadas.
              </p>
            ) : (
              <ol className="mt-4 border-t border-white/20">
                {noticias.map((item, index) => (
                  <li key={item.id} className="border-b border-white/15">
                    <a
                      href={item.url}
                      download={item.nombreArchivo || true}
                      className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 px-3 py-5 transition-colors hover:bg-white/10 md:grid-cols-[4.5rem_1fr_auto]"
                    >
                      <span className="text-xs uppercase tracking-[0.22em] text-white/50 transition-colors group-hover:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-medium leading-snug underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-white md:text-xl">
                        {item.titulo}
                      </span>
                      <span className="col-start-2 shrink-0 text-sm uppercase tracking-[0.12em] text-white/55 transition-colors group-hover:text-white md:col-start-auto">
                        {["Descargar", item.fecha].filter(Boolean).join(" · ")}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="mt-10">
            <BotonSitio href="#suscripcion">Suscribirme</BotonSitio>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs uppercase tracking-[0.22em]">02 — Qué llega</p>
            <h2 className="mt-4 max-w-2xl text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
              Una vez por mes, para decidir en planta
            </h2>
          <ol className="mt-12 grid gap-px bg-navy/15 sm:grid-cols-2">
            {LLEGA.map((item) => (
              <li key={item.n} className="bg-white px-6 py-10 md:px-8">
                <span className="text-xs uppercase tracking-[0.22em]">{item.n}</span>
                <h3 className="mt-5 text-base font-medium uppercase tracking-[0.12em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="suscripcion"
        className="scroll-mt-[calc(var(--site-header-h)+var(--dev-banner-h)+1rem)] bg-paper"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">03 — Alta</p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              Suscribite gratis
            </h2>
            <p className="mt-4 mb-8 max-w-xl text-base leading-relaxed">
              Completá el formulario y elegí WhatsApp o email. Coordinamos el
              alta por el canal que elijas.
            </p>
            <div className="border border-navy/20 bg-white p-6 md:p-8">
              <NewsletterForm />
            </div>
          </div>
          <div className="relative hidden min-h-[400px] overflow-hidden lg:block">
            <Image
              src="/newsletter/hero.png"
              alt="Notas técnicas de planta para el boletín"
              fill
              className="object-cover grayscale"
              sizes="50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
