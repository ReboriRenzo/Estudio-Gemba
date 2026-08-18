import Image from "next/image";
import Link from "next/link";
import { canalesDisponibles, contacto } from "@/lib/contacto";
import { SERVICIOS } from "@/lib/servicios";
import { BotonSitio } from "@/components/BotonSitio";

function LinkedInMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LinkedInItem({ url }: { url: string }) {
  const content = (
    <>
      <LinkedInMark />
      LinkedIn
    </>
  );

  if (!url) {
    return (
      <span title="LinkedIn — próximamente" className="inline-flex items-center gap-2">
        {content}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {content}
    </a>
  );
}

export function SiteFooter() {
  const canales = canalesDisponibles(contacto);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-firmind-blanco.png"
            alt="FIRMIND"
            width={1834}
            height={725}
            className="mb-4 h-12 w-auto"
          />
          <p className="text-sm leading-relaxed text-white">
            Optimización de procesos con datos de planta, no con métodos
            genéricos.
          </p>
          <Link
            href="/sobre-nosotros"
            className="mt-3 inline-block text-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Sobre nosotros
          </Link>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em]">Servicios</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {SERVICIOS.map((servicio) => (
              <li key={servicio.slug}>
                <Link
                  href={`/servicios/${servicio.slug}`}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {servicio.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em]">Contacto</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>{contacto.horario}</li>
            <li>{contacto.zona}</li>
            {canales.email ? (
              <li>
                <a
                  href={`mailto:${contacto.email.trim()}`}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
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
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  +54 9 11 2764-2266
                </a>
              </li>
            ) : null}
            <li>
              <LinkedInItem url={contacto.linkedin.trim()} />
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
            <Link
              href="/newsletter"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Boletín de Industria
            </Link>
          </h2>
          <p className="mt-4 mb-6 text-sm">
            Los datos del sector, traducidos a decisiones de planta. Una vez
            por mes.
          </p>
          <BotonSitio href="/newsletter">Suscribirme</BotonSitio>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} FIRMIND</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.instagram.com/vexelstudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Vexelstudios
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
