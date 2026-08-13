export type Servicio = {
  slug: string;
  titulo: string;
  resumen: string;
  resumenLargo: string;
  resultado: string;
  paraQuien: string;
  queSeMide: string;
  queSeHace: string[];
  entregable: string;
  icon:
    | "clipboard-document-check"
    | "chart-bar"
    | "clock"
    | "squares-2x2"
    | "cog-6-tooth";
};

export const SERVICIO_OTRO = "no-estoy-seguro";

export const SERVICIOS = [
  {
    slug: "diagnostico-de-planta",
    titulo: "Diagnóstico de planta",
    resumen:
      "Baseline numérico de OEE, scrap y paradas antes de proponer herramientas.",
    resumenLargo:
      "Medimos la operación con datos de planta. El diagnóstico ordena pérdidas y deja un mapa priorizado para decidir dónde intervenir.",
    resultado:
      "Una línea con números compartidos: qué se pierde, cuánto y dónde.",
    paraQuien:
      "Jefes de planta y directores de operaciones de PyMEs industriales que necesitan un punto de partida medible.",
    queSeMide:
      "OEE, tasas de scrap, tiempos muertos, paradas y cuellos de botella visibles en piso.",
    queSeHace: [
      "Relevamiento en Gemba y de registros existentes (no un modelo teórico genérico).",
      "Cálculo de baseline y clasificación de pérdidas.",
      "Priorización por impacto y factibilidad de intervención.",
    ],
    entregable: "Informe numérico y mapa de pérdidas priorizado.",
    icon: "clipboard-document-check",
  },
  {
    slug: "reduccion-de-perdidas",
    titulo: "Reducción de pérdidas",
    resumen:
      "Ataque a scrap, retrabajo y cuellos de botella a partir del diagnóstico.",
    resumenLargo:
      "Intervenimos las pérdidas que el número ya señaló. El trabajo es contrapuntos en la línea, no un programa genérico de 'mejora continua'.",
    resultado:
      "Menor scrap y menos retrabajo, con seguimiento de la tasa en el tiempo.",
    paraQuien:
      "Plantas que ya ven el desperdicio pero no tienen un plan atado a indicadores.",
    queSeMide: "Tasa de scrap, retrabajo, throughput del cuello de botella.",
    queSeHace: [
      "Selección de contrapuntos a partir del mapa de pérdidas.",
      "Prueba en Gemba con responsables de planta.",
      "Ajuste del estándar y cadencia de revisión del indicador.",
    ],
    entregable: "Plan de contrapuntos y seguimiento de tasa de scrap.",
    icon: "chart-bar",
  },
  {
    slug: "smed-cambio-rapido",
    titulo: "SMED / cambio rápido",
    resumen: "Reducción de setups para subir disponibilidad de máquina.",
    resumenLargo:
      "Separación de operaciones internas y externas, y estándar de cambio medido antes y después.",
    resultado: "Setups más cortos y más tiempo de máquina disponible.",
    paraQuien:
      "Líneas con muchos cambios de formato o utillaje y disponibilidad baja.",
    queSeMide: "Tiempo de setup, disponibilidad, OEE asociado al cambio.",
    queSeHace: [
      "Filmación y desglose del cambio actual.",
      "Reclasificación interno/externo y preparación en paralelo.",
      "Estándar de cambio y medición antes/después.",
    ],
    entregable: "Estándar de cambio y medición antes/después.",
    icon: "clock",
  },
  {
    slug: "tpm-5s",
    titulo: "TPM y 5S",
    resumen:
      "Orden, inspección básica y disciplina de piso, diseñados para la planta real.",
    resumenLargo:
      "No es una auditoría cosmética. 5S y mantenimiento autónomo se arman para que se sostengan en el turno.",
    resultado:
      "Piso legible, fallas menores detectadas antes y adherencia medible al rutinario.",
    paraQuien:
      "PyMEs que necesitan disciplina operativa sin un programa TPM corporativo maduro.",
    queSeMide:
      "Adherencia al rutinario, hallazgos de inspección, tiempos de búsqueda/desorden.",
    queSeHace: [
      "Diagnóstico de orden y de mantenimiento básico en la celda piloto.",
      "Definición de rutinario 5S/TPM con roles de planta.",
      "Tablero de adherencia y cadencia de auditoría corta.",
    ],
    entregable: "Rutinario 5S/TPM y tablero de adherencia.",
    icon: "squares-2x2",
  },
  {
    slug: "implementacion",
    titulo: "Implementación",
    resumen:
      "Bajar el plan a la línea, con responsables y métricas de seguimiento.",
    resumenLargo:
      "El valor está en el piso. Acompañamos hitos, indicadores y la cadencia de revisión con el equipo de planta.",
    resultado:
      "Un plan ejecutado en Gemba, no un informe que queda en el escritorio.",
    paraQuien:
      "Dirección de operaciones que ya tiene diagnóstico o plan y necesita implementación.",
    queSeMide: "Hitos cumplidos, indicadores acordados en el diagnóstico, desviaciones.",
    queSeHace: [
      "Traducción del plan a tareas de turno y responsables.",
      "Seguimiento en planta y ajuste de contrapuntos.",
      "Cadencia de revisión con números, no con percepción.",
    ],
    entregable: "Hitos, indicadores y cadencia de revisión.",
    icon: "cog-6-tooth",
  },
] as const satisfies readonly Servicio[];

export function getServicio(slug: string) {
  return SERVICIOS.find((s) => s.slug === slug);
}

export function slugsServicios(): string[] {
  return SERVICIOS.map((s) => s.slug);
}
