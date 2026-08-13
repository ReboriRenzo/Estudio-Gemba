import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ContactConfigBanner } from "@/components/ContactConfigBanner";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estudiogemba.com.ar"),
  title: { default: "Estudio Gemba", template: "%s | Estudio Gemba" },
  description:
    "Ingeniería y optimización de procesos para PyMEs industriales. Diagnóstico con OEE, scrap y tiempos muertos. Buenos Aires, Zona Sur.",
  openGraph: {
    locale: "es_AR",
    type: "website",
    url: "https://estudiogemba.com.ar",
    siteName: "Estudio Gemba",
    images: [{ url: "/logo-gemba.png", alt: "Estudio Gemba" }],
  },
  twitter: {
    card: "summary",
    images: ["/logo-gemba.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-white font-sans text-navy"
        suppressHydrationWarning
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Ir al contenido
        </a>
        <ContactConfigBanner />
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd />
      </body>
    </html>
  );
}
