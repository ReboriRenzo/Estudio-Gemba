import Link from "next/link";

export function CtaBand({ title, href }: { title: string; href: string }) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-xl text-2xl font-medium uppercase tracking-[0.16em]">
          {title}
        </h2>
        <Link
          href={href}
          className="border border-white px-6 py-3 text-sm uppercase tracking-[0.12em]"
        >
          Solicitar presupuesto
        </Link>
      </div>
    </section>
  );
}
