import type { Metadata } from "next";
import { InternoBoletinPanel } from "@/components/InternoBoletinPanel";

export const metadata: Metadata = {
  title: "Interno",
  robots: { index: false, follow: false },
};

export default function InternoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.22em]">FIRMIND</p>
      <h1 className="mt-3 text-2xl font-medium uppercase tracking-[0.14em]">
        Boletín — notas
      </h1>
      <div className="mt-10">
        <InternoBoletinPanel />
      </div>
    </section>
  );
}
