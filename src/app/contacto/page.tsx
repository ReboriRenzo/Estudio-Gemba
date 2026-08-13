import type { Metadata } from "next";
import { BudgetForm } from "@/components/BudgetForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageHero } from "@/components/PageHero";
import { canalesDisponibles, contacto } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicitá presupuesto a Estudio Gemba. Horario 09:00 a 20:00. Zona Sur, Buenos Aires.",
};

type Props = { searchParams: Promise<{ servicio?: string }> };

export default async function ContactoPage({ searchParams }: Props) {
  const { servicio } = await searchParams;
  const canales = canalesDisponibles(contacto);

  return (
    <>
      <PageHero
        title="Contacto"
        description="Completá el formulario y te respondemos por el canal que elijas cuando esté activo."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <section>
          <h2 className="mb-6 text-sm uppercase tracking-[0.18em]">
            Solicitar presupuesto
          </h2>
          <BudgetForm servicioInicial={servicio} />
        </section>
        <aside className="border border-navy/20 p-6 lg:self-start">
          <h2 className="text-sm uppercase tracking-[0.18em]">Datos</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            <li>Horario: {contacto.horario}</li>
            <li>{contacto.zona}</li>
            {canales.email ? (
              <li>
                <a href={`mailto:${contacto.email.trim()}`}>
                  {contacto.email.trim()}
                </a>
              </li>
            ) : null}
            {canales.whatsapp ? (
              <li>
                <a
                  href={`https://wa.me/${contacto.whatsapp.trim()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li title={canales.linkedin ? undefined : "LinkedIn — próximamente"}>
              LinkedIn
              {canales.linkedin ? (
                <>
                  {" — "}
                  <a
                    href={contacto.linkedin.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    perfil
                  </a>
                </>
              ) : (
                " — próximamente"
              )}
            </li>
          </ul>
          <div className="mt-10">
            <h3 className="text-sm uppercase tracking-[0.18em]">Newsletter</h3>
            <div className="mt-4">
              <NewsletterForm variant="page" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
