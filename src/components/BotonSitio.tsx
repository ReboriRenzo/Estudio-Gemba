import Link from "next/link";

const TONOS = {
  navy:
    "border-white bg-white text-navy hover:bg-transparent hover:text-white focus-visible:outline-white",
  outline:
    "border-white bg-transparent text-white hover:bg-white hover:text-navy focus-visible:outline-white",
  paper:
    "border-navy bg-navy text-white hover:bg-transparent hover:text-navy focus-visible:outline-navy",
} as const;

export function BotonSitio({
  href,
  children,
  tono = "navy",
}: {
  href: string;
  children: string;
  tono?: keyof typeof TONOS;
}) {
  return (
    <Link
      href={href}
      className={`inline-block w-fit border px-6 py-3 text-sm uppercase tracking-[0.12em] transition-colors ${TONOS[tono]}`}
    >
      {children}
    </Link>
  );
}
