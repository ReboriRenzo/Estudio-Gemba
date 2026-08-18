import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PhotoHero } from "@/components/PhotoHero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";
import { MARQUESINA_SERVICIOS } from "@/lib/marquesinas";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diagnóstico, ejecución y autonomía para PyMEs industriales. Fases independientes, alcance cerrado y presencia decreciente.",
};

export default function ServiciosPage() {
  return (
    <>
      <PhotoHero
        kicker="Tres fases"
        title="Servicios"
        description="Las fases se contratan de manera independiente. El diagnóstico no obliga a continuar y se entrega completo aunque la empresa decida no avanzar."
        image="/servicios/hero.png"
        alt="Estaciones de trabajo en planta: cada fase se ejecuta en la línea"
      />
      <VocabularioMarquee
        terms={MARQUESINA_SERVICIOS}
        label="Vocabulario de servicios"
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ServiceGrid variant="catalog" />
      </section>
      <section className="border-t border-navy/15 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em]">Cómo se contrata</p>
            <h2 className="mt-4 text-2xl font-medium uppercase tracking-[0.12em]">
              Independientes, o un programa de 12 meses
            </h2>
            <p className="mt-6 text-base leading-relaxed">
              El programa integral se estructura sobre 12 meses, con dedicación
              decreciente establecida contractualmente desde el inicio. La
              presencia decrece por diseño.
            </p>
          </div>
          <p className="self-center text-base leading-relaxed">
            Si al cabo de un año seguimos siendo necesarios, el trabajo no
            cumplió su objetivo.
          </p>
        </div>
      </section>
      <CtaBand title="Consultá la fase para tu planta" href="/contacto" />
    </>
  );
}
