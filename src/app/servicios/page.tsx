import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PhotoHero } from "@/components/PhotoHero";
import { ServiceGrid } from "@/components/ServiceGrid";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diagnóstico de planta, reducción de pérdidas, SMED, TPM y 5S, e implementación en Gemba para PyMEs industriales.",
};

export default function ServiciosPage() {
  return (
    <>
      <PhotoHero
        kicker="Catálogo"
        title="Servicios"
        description="No vendemos mejora continua genérica. Diagnosticamos con números e implementamos en el piso."
        image="/servicios/hero.png"
        alt="Estaciones de trabajo en planta: cada servicio se ejecuta en la línea"
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ServiceGrid variant="catalog" />
      </section>
      <CtaBand title="Consultá el servicio para tu planta" href="/contacto" />
    </>
  );
}
