const STEPS = [
  {
    n: "01",
    title: "Diagnóstico numérico",
    body: "Baseline de OEE, scrap, paradas y pérdidas, leído en la planta y en los registros.",
  },
  {
    n: "02",
    title: "Plan de acción",
    body: "Contramedidas priorizadas por impacto, no un paquete genérico de herramientas.",
  },
  {
    n: "03",
    title: "Implementación en Gemba",
    body: "El plan baja a la línea, con responsables de planta y prueba en el piso.",
  },
  {
    n: "04",
    title: "Seguimiento medible",
    body: "Cadencia de revisión con indicadores. Se sostiene lo que se mide.",
  },
] as const;

export function MethodSteps() {
  return (
    <ol className="grid gap-px bg-navy/15 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step) => (
        <li key={step.n} className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-navy/70">
            {step.n}
          </p>
          <h3 className="mt-3 text-base font-medium uppercase tracking-[0.12em]">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
