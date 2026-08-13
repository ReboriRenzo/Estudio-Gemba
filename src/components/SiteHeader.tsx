"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/newsletter", label: "Boletín de Industria" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    function onScroll() {
      setScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overlay = isHome && !scrolled;

  return (
    <>
      <header
        className={
          overlay
            ? "fixed top-[var(--dev-banner-h)] z-40 h-[var(--site-header-h)] w-full border-b border-transparent bg-transparent transition-[background-color,border-color] duration-300"
            : "fixed top-[var(--dev-banner-h)] z-40 h-[var(--site-header-h)] w-full border-b border-navy/15 bg-white transition-[background-color,border-color] duration-300"
        }
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className={
              overlay
                ? "shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                : "shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            }
          >
            <Image
              src={overlay ? "/logo-gemba-blanco.png" : "/logo-gemba.png"}
              alt="Estudio Gemba"
              width={986}
              height={597}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <nav
            aria-label="Principal"
            className="flex items-center justify-end gap-x-5 overflow-x-auto md:gap-x-6"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  overlay
                    ? "shrink-0 text-sm font-semibold whitespace-nowrap text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    : "shrink-0 text-sm font-normal whitespace-nowrap text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {isHome ? null : (
        <div className="h-[var(--site-header-h)] shrink-0" aria-hidden="true" />
      )}
    </>
  );
}
