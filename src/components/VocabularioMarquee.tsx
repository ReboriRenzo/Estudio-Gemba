const TERMINOS_PLANTA = [
  "Eficiencia",
  "Scrap",
  "Cuellos de botella",
  "Retrabajos",
  "Tiempos muertos",
  "Setups",
  "Paros no planeados",
  "Lead time",
  "Capacidad ociosa",
  "Inventario en proceso",
] as const;

export function VocabularioMarquee({
  terms = TERMINOS_PLANTA,
  label = "Vocabulario de planta",
}: {
  terms?: readonly string[];
  label?: string;
}) {
  const vuelta = [...terms, ...terms];

  return (
    <section
      className="shrink-0 overflow-hidden bg-navy text-white"
      aria-label={label}
    >
      <div className="marquee-track py-5 md:py-6">
        {vuelta.map((term, index) => (
          <p
            key={`${term}-${index}`}
            className="flex shrink-0 items-center gap-10 px-5"
          >
            <span className="text-[0.95rem] font-semibold uppercase tracking-[0.26em] text-white">
              {term}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-white/70" />
          </p>
        ))}
      </div>
    </section>
  );
}
