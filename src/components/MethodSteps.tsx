const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    body: "Cinco días en planta, alcance cerrado. Restricción localizada, pérdida mensual cuantificada y sin obligación de continuar.",
  },
  {
    n: "02",
    title: "Ejecución",
    body: "Ciclos de tres meses. Tres prioridades con indicador y responsable. El trabajo se concentra en lo que traba la ejecución.",
  },
  {
    n: "03",
    title: "Autonomía",
    body: "Presencia decreciente. Estándares, tablero operativo y reunión diaria conducida por personal propio.",
  },
] as const;

export function MethodSteps() {
  return (
    <ol className="grid gap-px bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
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
