import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/15 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
          <Image
            src="/logo-gemba.png"
            alt="Estudio Gemba"
            width={937}
            height={582}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav
          aria-label="Principal"
          className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="rounded-none bg-navy px-4 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Solicitar presupuesto
          </Link>
        </nav>
      </div>
    </header>
  );
}
