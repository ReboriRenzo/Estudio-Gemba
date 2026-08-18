import type { Metadata } from "next";
import { ConsultaEmailForm } from "@/components/ConsultaEmailForm";
import { PhotoHero } from "@/components/PhotoHero";
import { VocabularioMarquee } from "@/components/VocabularioMarquee";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { canalesDisponibles, contacto } from "@/lib/contacto";
import { MARQUESINA_CONTACTO } from "@/lib/marquesinas";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a FIRMIND por WhatsApp o email. Horario 09:00 a 20:00. Zona Sur, Buenos Aires.",
};

export default function ContactoPage() {
  const canales = canalesDisponibles(contacto);

  return (
    <>
      <PhotoHero
        kicker="FIRMIND"
        title="Contacto"
        description="Escribinos por WhatsApp o enviá una consulta por email."
        image="/contacto/hero.png"
        alt="Escritorio técnico junto a la planta"
      />
      <VocabularioMarquee
        terms={MARQUESINA_CONTACTO}
        label="Vocabulario de contacto"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <div className="flex flex-col gap-14">
          <section>
            <h2 className="mb-3 text-sm uppercase tracking-[0.18em]">WhatsApp</h2>
            <p className="mb-6 max-w-xl text-sm leading-relaxed">
              Coordinación directa con el estudio.
            </p>
            <WhatsAppButton />
          </section>
          <section>
            <h2 className="mb-3 text-sm uppercase tracking-[0.18em]">
              Consulta por email
            </h2>
            <p className="mb-6 max-w-xl text-sm leading-relaxed">
              Completá el formulario y te respondemos por correo.
            </p>
            <ConsultaEmailForm />
          </section>
        </div>
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
                <a href={`https://wa.me/${contacto.whatsapp.trim()}`}>
                  +54 9 11 2764-2266
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
        </aside>
      </div>
    </>
  );
}
