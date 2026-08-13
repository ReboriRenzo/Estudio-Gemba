import type { MetadataRoute } from "next";
import { slugsServicios } from "@/lib/servicios";

const base = "https://estudiogemba.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/servicios",
    "/sobre-nosotros",
    "/newsletter",
    "/contacto",
  ];
  const servicios = slugsServicios().map((slug) => `/servicios/${slug}`);

  return [...staticRoutes, ...servicios].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
