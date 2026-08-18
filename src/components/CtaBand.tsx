import Image from "next/image";
import { BotonSitio } from "@/components/BotonSitio";

export function CtaBand({
  title,
  href,
  image = "/home/estudio.png",
}: {
  title: string;
  href: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="cta-kenburns pointer-events-none absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover grayscale"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-navy/72" />
      <div className="cta-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-xl text-2xl font-medium uppercase tracking-[0.16em]">
          {title}
        </h2>
        <BotonSitio href={href}>Contacto</BotonSitio>
      </div>
    </section>
  );
}
