"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const NAV = [
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/newsletter", label: "Boletín de Industria" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const overlay = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={
          overlay
            ? "fixed top-[var(--dev-banner-h)] z-50 h-20 w-full border-b border-transparent bg-transparent transition-[background-color,border-color,height] duration-300 md:h-24 lg:h-28"
            : "fixed top-[var(--dev-banner-h)] z-50 h-[var(--site-header-h)] w-full border-b border-navy/15 bg-white transition-[background-color,border-color,height] duration-300"
        }
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4">
          <Link
            href="/"
            className={
              overlay
                ? "min-w-0 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                : "min-w-0 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            }
          >
            <Image
              src={overlay ? "/logo-firmind-blanco.png" : "/logo-firmind.png"}
              alt="FIRMIND"
              width={1834}
              height={725}
              className={
                overlay
                  ? "h-10 w-auto max-w-[46vw] transition-[height] duration-300 md:h-16 md:max-w-none lg:h-20"
                  : "h-10 w-auto max-w-[46vw] transition-[height] duration-300 md:h-12 md:max-w-none"
              }
              priority
            />
          </Link>
          <button
            type="button"
            className={
              overlay
                ? "inline-flex h-11 w-11 items-center justify-center border-0 bg-transparent text-white md:hidden"
                : "inline-flex h-11 w-11 items-center justify-center border-0 bg-transparent text-navy md:hidden"
            }
            aria-expanded={menuOpen}
            aria-controls={navId}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
          <nav
            aria-label="Principal"
            className="hidden items-center justify-end gap-x-6 md:flex"
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
      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 border-0 bg-navy/30 md:hidden"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id={navId}
            className="fixed inset-x-0 z-50 border-b border-navy/15 bg-white md:hidden"
            style={{
              top: "calc(var(--dev-banner-h) + var(--site-header-h))",
            }}
          >
            <nav
              aria-label="Principal"
              className="mx-auto flex max-w-6xl flex-col px-4 py-2"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-navy/10 py-3 text-sm text-navy last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      ) : null}
      {isHome ? null : (
        <div className="h-[var(--site-header-h)] shrink-0" aria-hidden="true" />
      )}
    </>
  );
}
