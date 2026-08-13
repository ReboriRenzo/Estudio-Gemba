import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getServicio, slugsServicios } from "@/lib/servicios";

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

  return (
    <>
      <PageHero title={servicio.titulo} description={servicio.resultado} />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Section title="Para quién" body={servicio.paraQuien} />
        <Section title="Qué se mide" body={servicio.queSeMide} />
        <div className="border-b border-navy/15 py-10">
          <h2 className="text-sm uppercase tracking-[0.18em]">Qué se hace en planta</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed">
            {servicio.queSeHace.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ol>
        </div>
        <Section title="Entregable" body={servicio.entregable} />
      </article>
      <CtaBand
        title="Solicitar presupuesto"
        href={`/contacto?servicio=${servicio.slug}`}
      />
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-b border-navy/15 py-10">
      <h2 className="text-sm uppercase tracking-[0.18em]">{title}</h2>
      <p className="mt-4 text-base leading-relaxed">{body}</p>
    </section>
  );
}
