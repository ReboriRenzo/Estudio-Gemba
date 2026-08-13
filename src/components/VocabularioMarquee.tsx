const DESTACADOS = [
  "OEE",
  "Scrap",
  "Tiempos muertos",
  "Disponibilidad",
  "Gemba",
] as const;

const OTROS = [
  "SMED",
  "TPM",
  "5S",
  "Cuellos de botella",
  "Retrabajo",
  "Baseline",
  "Setup",
  "Paradas",
  "Rendimiento",
  "Calidad",
  "Throughput",
  "Mapa de pérdidas",
  "Cambio rápido",
] as const;

type Termino = { label: string; destacado: boolean };

function armarSecuencia(): Termino[] {
  const gaps = DESTACADOS.length;
  const porHueco = Array.from({ length: gaps }, () => 2);
  let extra = OTROS.length - 2 * gaps;
  for (let i = 0; extra > 0; i += 1, extra -= 1) {
    porHueco[i] += 1;
  }

  const secuencia: Termino[] = [];
  let cursor = 0;
  DESTACADOS.forEach((label, i) => {
    secuencia.push({ label, destacado: true });
    for (let n = 0; n < porHueco[i]; n += 1) {
      secuencia.push({ label: OTROS[cursor], destacado: false });
      cursor += 1;
    }
  });
  return secuencia;
}

const TERMINOS = armarSecuencia();

export function VocabularioMarquee() {
  const vuelta = [...TERMINOS, ...TERMINOS];

  return (
    <section
      className="shrink-0 overflow-hidden bg-navy text-white"
      aria-label="Vocabulario de planta"
    >
      <div className="marquee-track py-5 md:py-6">
        {vuelta.map((term, index) => (
          <p
            key={`${term.label}-${index}`}
            className="flex shrink-0 items-center gap-10 px-5"
          >
            <span
              className={
                term.destacado
                  ? "text-[0.95rem] font-semibold uppercase tracking-[0.26em] text-white"
                  : "text-sm font-normal tracking-[0.16em] text-white/45"
              }
            >
              {term.destacado ? term.label.toUpperCase() : term.label}
            </span>
            <span
              aria-hidden="true"
              className={
                term.destacado ? "h-px w-10 bg-white/70" : "h-px w-8 bg-white/20"
              }
            />
          </p>
        ))}
      </div>
    </section>
  );
}
