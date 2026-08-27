import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PhotoHero } from "@/components/PhotoHero";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";
import {
  getServicio,
  imagenesServicio,
  SERVICIOS,
  slugsServicios,
} from "@/lib/servicios";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return slugsServicios().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return { title: "Servicio" };
  return {
    title: servicio.titulo,
    description: servicio.resumen,
  };
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const fotos = imagenesServicio(servicio.slug);
  const otros = SERVICIOS.filter((item) => item.slug !== servicio.slug);

  return (
    <>
      <PhotoHero
        kicker={`Fase ${servicio.fase}`}
        title={servicio.titulo}
        description={servicio.duracion}
        image={fotos.card}
        alt={servicio.altHero}
      />
      <VocabularioMarquee
        terms={servicio.marquee}
        label={`Vocabulario de ${servicio.titulo}`}
      />

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.22em] lg:col-span-3">
            01 — Qué se logra
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
              {servicio.resultado}
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed md:text-lg">
              <p>{servicio.contexto}</p>
              <p>
                <span className="block text-xs uppercase tracking-[0.22em]">
                  ¿Para quién?
                </span>
                <span className="mt-3 block">{servicio.paraQuien}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[480px]">
            <Image
              src={fotos.planta}
              alt={servicio.altPlanta}
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">02 — Qué se mide</p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              {servicio.slug === "diagnostico"
                ? "Lo que la planta no registra"
                : servicio.slug === "ejecucion"
                  ? "Lo que se revisa cada quince días"
                  : "Lo que queda cuando nos vamos"}
            </h2>
            <p className="mt-6 text-base leading-relaxed">{servicio.queSeMide}</p>
            {servicio.slug === "ejecucion" ? (
              <p className="mt-4 text-base leading-relaxed">
                {servicio.criterioExito}
              </p>
            ) : null}
            <ul className="mt-8 flex flex-wrap gap-2">
              {servicio.indicadores.map((item) => (
                <li
                  key={item}
                  className="border border-navy/20 px-3 py-1.5 text-xs uppercase tracking-[0.14em]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs uppercase tracking-[0.22em]">
            03 — Qué se hace en planta
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-medium uppercase tracking-[0.12em] md:text-3xl">
            {servicio.slug === "ejecucion"
              ? "Cómo se sostiene el avance"
              : servicio.slug === "autonomia"
                ? "El trabajo, con su gente"
                : "El trabajo, en el piso"}
          </h2>
          <ol
            className={
              servicio.queSeHace.length === 4
                ? "mt-12 grid gap-px bg-navy/15 sm:grid-cols-2"
                : "mt-12 grid gap-px bg-navy/15 md:grid-cols-2 lg:grid-cols-3"
            }
          >
            {servicio.queSeHace.map((paso, index) => (
              <li key={paso} className="bg-white px-6 py-10 md:px-8">
                <span className="text-xs uppercase tracking-[0.22em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-base leading-relaxed">{paso}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-navy/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div className="order-2 flex flex-col justify-center py-4 lg:order-1 lg:py-8">
            <p className="text-xs uppercase tracking-[0.22em]">04 — Entregable</p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              {servicio.entregable}
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              {servicio.entregableDetalle}
            </p>
            {servicio.slug === "diagnostico" ? (
              <div className="mt-4 space-y-4 text-base leading-relaxed">
                <p>
                  Si no se identifica una oportunidad verificable de{" "}
                  <strong>
                    al menos cinco veces el honorario, no se factura
                  </strong>
                  .
                </p>
                <p>
                  Si el problema resulta ser comercial o financiero y no
                  operativo, se dice y no se factura.
                </p>
                <p>
                  Las primeras recomendaciones son las que no cuestan dinero:
                  comprar equipamiento es lo último.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-base leading-relaxed">
                {servicio.notaComercial}
              </p>
            )}
          </div>
          <div className="relative order-1 min-h-[280px] overflow-hidden lg:order-2 lg:min-h-[480px]">
            <Image
              src={fotos.detalle}
              alt={servicio.altDetalle}
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs uppercase tracking-[0.22em]">Otras fases</p>
          <ul className="mt-8 grid gap-px bg-navy/15 sm:grid-cols-2">
            {otros.map((item) => (
              <li key={item.slug} className="bg-white">
                <Link
                  href={`/servicios/${item.slug}`}
                  className="flex h-full flex-col p-6 transition-colors hover:bg-paper"
                >
                  <span className="text-xs uppercase tracking-[0.18em] text-navy/70">
                    Fase {item.fase}
                  </span>
                  <span className="mt-2 text-sm font-medium uppercase tracking-[0.12em]">
                    {item.titulo}
                  </span>
                  <span className="mt-4 text-xs uppercase tracking-[0.14em]">
                    Ver más
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Consultá esta fase" href="/contacto" />
    </>
  );
}
