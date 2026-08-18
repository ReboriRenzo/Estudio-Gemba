import Image from "next/image";
import { BotonSitio } from "@/components/BotonSitio";

export function NewsletterSection({
  heading = "h2",
}: {
  heading?: "h1" | "h2";
}) {
  const Title = heading;

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-titulo"
      className="bg-paper"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
        <div className="relative min-h-[280px] overflow-hidden lg:min-h-[480px]">
          <Image
            src="/newsletter/hero.png"
            alt="Mesa de trabajo técnico: notas e indicadores de planta"
            fill
            className="object-cover grayscale"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center py-4 lg:py-8">
          <p className="text-xs uppercase tracking-[0.28em]">Publicación</p>
          <Title
            id="newsletter-titulo"
            className="mt-4 text-2xl font-medium uppercase tracking-[0.16em] md:text-3xl"
          >
            Boletín de Industria
          </Title>
          <p className="mt-4 mb-8 max-w-xl text-base leading-relaxed">
            Los datos del sector, traducidos a decisiones de planta. Una vez
            por mes. Suscripción gratuita.
          </p>
          <BotonSitio href="/newsletter" tono="paper">
            Suscribirme
          </BotonSitio>
        </div>
      </div>
    </section>
  );
}
