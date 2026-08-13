import type { Metadata } from "next";
import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";
import { leerNoticias } from "@/lib/boletin-archivo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Boletín de Industria",
  description:
    "Suscribite gratis al boletín de industria de Estudio Gemba: diagnóstico de planta, OEE, scrap e indicadores.",
};

const LLEGA = [
  {
    n: "01",
    title: "Indicadores",
    body: "OEE, scrap y tiempos muertos leídos en planta, no en un dashboard genérico.",
  },
  {
    n: "02",
    title: "Contrapuntos",
    body: "Un caso corto: qué se midió, qué se cambió en la línea y qué número se movió.",
  },
  {
    n: "03",
    title: "Vocabulario",
    body: "Las palabras que usa el piso: disponibilidad, setup, cuello, adherencia.",
  },
  {
    n: "04",
    title: "Sin ruido",
    body: "Una edición cuando hay algo que medir. No una ráfaga comercial.",
  },
] as const;

const TEMAS = [
  "OEE sin teatro",
  "Scrap que el costo esconde",
  "Setups que comen disponibilidad",
  "5S que se sostiene en el turno",
  "El cuello que no se ve en el ERP",
  "Baseline antes de la herramienta",
] as const;

export default function NewsletterPage() {
  const temas = [...TEMAS, ...TEMAS];
  const noticias = leerNoticias();

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
            Lectura de planta para jefes y directores de operaciones. OEE,
            scrap y contrapuntos. Suscripción gratuita, por WhatsApp o email.
          </p>
        </div>
      </header>

      <VocabularioMarquee />

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
              Una lectura de planta, no un newsletter de marketing
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed md:text-lg">
              <p>
                El Boletín de Industria junta lo que se ve en Gemba: números
                que se pueden discutir en el turno, contrapuntos que ya se
                probaron y el vocabulario que usa la línea.
              </p>
              <p>
                Es gratuito. No es un embudo de venta ni una ráfaga semanal.
                Sale cuando hay algo que medir. Te suscribís y coordinamos el
                alta por el canal que elijas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs uppercase tracking-[0.22em]">02 — Qué llega</p>
          <h2 className="mt-4 max-w-2xl text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
            Cuatro piezas, siempre las mismas
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

      <section className="border-b border-navy/15 bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[480px]">
            <Image
              src="/newsletter/notas.png"
              alt="Cuaderno y notas técnicas de planta sobre un escritorio industrial"
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-navy/25" />
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/80">
              <span className="boletin-live h-2 w-2 rounded-full bg-white" />
              Notas de industria
            </p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
              Lo que se lee en planta
            </h2>
            {noticias.length === 0 ? (
              <p className="mt-8 text-base leading-relaxed text-white/80">
                Las notas de esta edición se publican acá.
              </p>
            ) : (
              <ul className="mt-8 flex flex-col gap-5">
                {noticias.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      download={item.nombreArchivo || true}
                      className="text-base font-medium leading-relaxed underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                    >
                      {item.titulo}
                    </a>
                    <p className="mt-1 text-sm text-white/65">
                      {["Descargar", item.fecha].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section id="suscripcion" className="bg-paper">
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
              <NewsletterForm variant="page" />
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
