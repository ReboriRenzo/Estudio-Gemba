export type Servicio = {
  slug: string;
  titulo: string;
  resumen: string;
  resumenLargo: string;
  resultado: string;
  contexto: string;
  paraQuien: string;
  queSeMide: string;
  indicadores: readonly string[];
  queSeHace: string[];
  entregable: string;
  entregableDetalle: string;
  altHero: string;
  altPlanta: string;
  altDetalle: string;
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
    contexto:
      "Sin baseline, cualquier herramienta es una receta. El diagnóstico arma un mapa compartido: OEE, scrap, paradas y cuellos de botella, leídos en el piso y contrastados con los registros que la planta ya tiene.",
    paraQuien:
      "Jefes de planta y directores de operaciones de PyMEs industriales que necesitan un punto de partida medible.",
    queSeMide:
      "OEE, tasas de scrap, tiempos muertos, paradas y cuellos de botella visibles en piso.",
    indicadores: ["OEE", "Scrap", "Paradas", "Cuello de botella"],
    queSeHace: [
      "Relevamiento en Gemba y de registros existentes (no un modelo teórico genérico).",
      "Cálculo de baseline y clasificación de pérdidas.",
      "Priorización por impacto y factibilidad de intervención.",
    ],
    entregable: "Informe numérico y mapa de pérdidas priorizado.",
    entregableDetalle:
      "Queda un documento que se puede discutir en el turno: números, fotos de contrapunto y un orden de ataque. No un deck genérico de mejora continua.",
    altHero: "Tablero de control y registros de planta para el diagnóstico",
    altPlanta: "Tablero de OEE y cronómetro en el piso de planta",
    altDetalle: "Manómetros y planilla de relevamiento en el puesto de control",
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
    contexto:
      "El desperdicio que se ve en el cajón no siempre es el que más duele. Atacamos las pérdidas que el diagnóstico ya señaló: scrap, retrabajo y el cuello que frena el throughput, con prueba en la línea.",
    paraQuien:
      "Plantas que ya ven el desperdicio pero no tienen un plan atado a indicadores.",
    queSeMide: "Tasa de scrap, retrabajo, throughput del cuello de botella.",
    indicadores: ["Scrap", "Retrabajo", "Throughput"],
    queSeHace: [
      "Selección de contrapuntos a partir del mapa de pérdidas.",
      "Prueba en Gemba con responsables de planta.",
      "Ajuste del estándar y cadencia de revisión del indicador.",
    ],
    entregable: "Plan de contrapuntos y seguimiento de tasa de scrap.",
    entregableDetalle:
      "Cada contrapunto tiene dueño, métrica y fecha de revisión. Si el número no se mueve, se ajusta el estándar: no se cierra el informe y se pasa a otra herramienta.",
    altHero: "Piezas metálicas en cajones: pérdidas visibles en la línea",
    altPlanta: "Cola de materiales frente a un cuello de botella",
    altDetalle: "Detalle de scrap y piezas rechazadas en planta",
    icon: "chart-bar",
  },
  {
    slug: "smed-cambio-rapido",
    titulo: "SMED / cambio rápido",
    resumen: "Reducción de setups para subir disponibilidad de máquina.",
    resumenLargo:
      "Separación de operaciones internas y externas, y estándar de cambio medido antes y después.",
    resultado: "Setups más cortos y más tiempo de máquina disponible.",
    contexto:
      "El cambio de formato come disponibilidad. SMED no es un taller de pizarra: se filma el setup, se separa interno de externo y se deja un estándar que el turno puede repetir, medido antes y después.",
    paraQuien:
      "Líneas con muchos cambios de formato o utillaje y disponibilidad baja.",
    queSeMide: "Tiempo de setup, disponibilidad, OEE asociado al cambio.",
    indicadores: ["Tiempo de setup", "Disponibilidad", "OEE"],
    queSeHace: [
      "Filmación y desglose del cambio actual.",
      "Reclasificación interno/externo y preparación en paralelo.",
      "Estándar de cambio y medición antes/después.",
    ],
    entregable: "Estándar de cambio y medición antes/después.",
    entregableDetalle:
      "Carro, utillaje y secuencia quedan definidos. El número que importa es minutos de máquina parada: se compara el cambio de referencia con el estándar nuevo.",
    altHero: "Componentes de máquina preparados para un cambio de formato",
    altPlanta: "Carro SMED con matrices, prensas y ranuras numeradas",
    altDetalle: "Detalle de matriz, prensas y marcas de cambio rápido",
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
    contexto:
      "5S y TPM no son una auditoría cosmética. Se diseña un rutinario que el turno puede sostener: orden, inspección básica y roles claros, con adherencia medida — no con fotos del día de la visita.",
    paraQuien:
      "PyMEs que necesitan disciplina operativa sin un programa TPM corporativo maduro.",
    queSeMide:
      "Adherencia al rutinario, hallazgos de inspección, tiempos de búsqueda/desorden.",
    indicadores: ["Adherencia", "Hallazgos", "Tiempo de búsqueda"],
    queSeHace: [
      "Diagnóstico de orden y de mantenimiento básico en la celda piloto.",
      "Definición de rutinario 5S/TPM con roles de planta.",
      "Tablero de adherencia y cadencia de auditoría corta.",
    ],
    entregable: "Rutinario 5S/TPM y tablero de adherencia.",
    entregableDetalle:
      "El entregable es un rutinario con dueños de celda y un tablero corto. Si no se audita en el turno, no existe: el estudio deja la cadencia, no un afiche.",
    altHero: "Tablero de sombras con herramientas ordenadas en planta",
    altPlanta: "Pasillos marcados, estación de limpieza y estanterías 5S",
    altDetalle: "Detalle de tablero de sombras y cinta de piso",
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
    contexto:
      "El valor está en el piso. Traducimos el plan a tareas de turno, responsables e indicadores, y acompañamos la cadencia de revisión hasta que el cambio queda en quienes operan la línea.",
    paraQuien:
      "Dirección de operaciones que ya tiene diagnóstico o plan y necesita implementación.",
    queSeMide: "Hitos cumplidos, indicadores acordados en el diagnóstico, desviaciones.",
    indicadores: ["Hitos", "Indicadores", "Desviaciones"],
    queSeHace: [
      "Traducción del plan a tareas de turno y responsables.",
      "Seguimiento en planta y ajuste de contrapuntos.",
      "Cadencia de revisión con números, no con percepción.",
    ],
    entregable: "Hitos, indicadores y cadencia de revisión.",
    entregableDetalle:
      "Un tablero de hitos que se revisa en planta. Si un contrapunto no corre, se ajusta en Gemba — no se archiva el plan y se espera al próximo trimestre.",
    altHero: "Documentación de línea y seguimiento de implementación",
    altPlanta: "Tablero de hitos y seguimiento en un pasillo de planta",
    altDetalle: "Detalle de hitos y tarjetas de seguimiento en Gemba",
    icon: "cog-6-tooth",
  },
] as const satisfies readonly Servicio[];

export function getServicio(slug: string) {
  return SERVICIOS.find((s) => s.slug === slug);
}

export function slugsServicios(): string[] {
  return SERVICIOS.map((s) => s.slug);
}

export function imagenesServicio(slug: string) {
  return {
    card: `/servicios/${slug}.png`,
    planta: `/servicios/${slug}-alt.png`,
    detalle: `/servicios/${slug}-detalle.png`,
  } as const;
}
