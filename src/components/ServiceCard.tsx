import Image from "next/image";
import Link from "next/link";
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { getServicio, imagenesServicio } from "@/lib/servicios";

const ICONS = {
  "clipboard-document-check": ClipboardDocumentCheckIcon,
  "chart-bar": ChartBarIcon,
  clock: ClockIcon,
  "squares-2x2": Squares2X2Icon,
  "cog-6-tooth": Cog6ToothIcon,
} as const;

export function ServiceCard({
  slug,
  variant,
}: {
  slug: string;
  variant: "home" | "catalog";
}) {
  const servicio = getServicio(slug);
  if (!servicio) return null;

  const Icon = ICONS[servicio.icon];
  const copy =
    variant === "catalog" ? servicio.resumenLargo : servicio.resumen;
  const fotos = imagenesServicio(servicio.slug);

  return (
    <article className="group flex h-full w-full flex-col border border-navy/20 transition-colors hover:border-navy">
      <div className="relative h-44 overflow-hidden bg-navy">
        <Image
          src={fotos.card}
          alt={servicio.altHero}
          fill
          className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Icon aria-hidden="true" className="h-6 w-6" />
        <h3 className="mt-4 text-base font-medium uppercase tracking-[0.12em]">
          {servicio.titulo}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed">{copy}</p>
        <Link
          href={`/servicios/${servicio.slug}`}
          className="mt-6 inline-block w-fit text-sm uppercase tracking-[0.12em]"
        >
          <span className="border-b border-transparent transition-colors group-hover:border-navy">
            Ver más
          </span>
        </Link>
      </div>
    </article>
  );
}
