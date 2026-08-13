import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { slugsServicios } from "@/lib/servicios";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diagnóstico de planta, reducción de pérdidas, SMED, TPM y 5S, e implementación en Gemba para PyMEs industriales.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        title="Servicios"
        description="No vendemos mejora continua genérica. Diagnosticamos con números e implementamos en el piso."
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {slugsServicios().map((slug) => (
            <ServiceCard key={slug} slug={slug} variant="catalog" />
          ))}
        </div>
      </section>
      <CtaBand
        title="Pedí un presupuesto con el servicio que necesitás"
        href="/contacto"
      />
    </>
  );
}
