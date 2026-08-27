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
  metadataBase: new URL("https://firmind.com.ar"),
  applicationName: "FIRMIND",
  title: {
    default: "FIRMIND | Optimización de procesos industriales",
    template: "%s | FIRMIND",
  },
  description:
    "Ingeniería y optimización de procesos para PyMEs industriales. Diagnóstico en planta, ejecución y autonomía. Buenos Aires.",
  openGraph: {
    locale: "es_AR",
    type: "website",
    url: "https://firmind.com.ar",
    siteName: "FIRMIND",
    title: "FIRMIND | Optimización de procesos industriales",
    description:
      "Ingeniería y optimización de procesos para PyMEs industriales. Diagnóstico en planta, ejecución y autonomía. Buenos Aires.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIRMIND | Optimización de procesos industriales",
    description:
      "Ingeniería y optimización de procesos para PyMEs industriales. Diagnóstico en planta, ejecución y autonomía. Buenos Aires.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-clip scroll-smooth antialiased`}
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
