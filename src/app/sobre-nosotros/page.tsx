import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Estudio técnico de ingeniería y optimización de procesos para PyMEs industriales. Zona Sur, Buenos Aires.",
};

const SECTIONS = [
  {
    title: "Qué es Estudio Gemba",
    body: "Un estudio técnico de ingeniería y optimización de procesos. No una consultora de presentaciones: el trabajo se sostiene en el diagnóstico numérico y en la implementación en planta.",
  },
  {
    title: "Por qué Gemba",
    body: "El problema se ve y se mide en el piso. OEE, scrap y tiempos muertos no se resuelven desde un modelo genérico; se leen en la línea, con el equipo que opera.",
  },
  {
    title: "Para quién",
    body: "PyMEs industriales. Ingenieros, jefes de planta y directores de operaciones que buscan resultados medibles. No es un programa TPM corporativo para plantas ya maduras como único cliente.",
  },
  {
    title: "Dónde",
    body: "Operamos en Zona Sur, Buenos Aires. También trabajamos en el resto de Argentina bajo coordinación.",
  },
  {
    title: "Cómo trabajamos",
    body: "Datos duros primero. Plan después. Implementación en Gemba y seguimiento con indicadores. Sin recetas teóricas desconectadas de la operación.",
  },
] as const;

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        title="Sobre nosotros"
        description="Estudio técnico. Rigor analítico. Implementación en planta."
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        {SECTIONS.map((section) => (
          <section
            key={section.title}
            className="border-b border-navy/15 py-10 first:pt-0"
          >
            <h2 className="text-sm uppercase tracking-[0.18em]">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
