import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <p className="text-xs uppercase tracking-[0.28em]">Error 404</p>
      <h1 className="mt-4 text-3xl font-medium uppercase tracking-[0.16em]">
        No encontramos esa página
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed">
        El enlace no corresponde a una sección del sitio. Volvé al inicio o
        escribinos desde contacto.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/"
          className="bg-navy px-6 py-3 text-sm uppercase tracking-[0.12em] text-white"
        >
          Inicio
        </Link>
        <Link
          href="/contacto"
          className="border border-navy px-6 py-3 text-sm uppercase tracking-[0.12em]"
        >
          Contacto
        </Link>
      </div>
    </div>
  );
}
