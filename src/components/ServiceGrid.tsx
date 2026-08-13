import { ServiceCard } from "@/components/ServiceCard";
import { slugsServicios } from "@/lib/servicios";

export function ServiceGrid({ variant }: { variant: "home" | "catalog" }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {slugsServicios().map((slug) => (
        <div
          key={slug}
          className="min-w-0 w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
        >
          <ServiceCard slug={slug} variant={variant} />
        </div>
      ))}
    </div>
  );
}
