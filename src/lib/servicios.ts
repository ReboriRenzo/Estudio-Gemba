export type Servicio = {
  slug: string;
  fase: string;
  titulo: string;
  duracion: string;
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
  criterioExito: string;
  notaComercial: string;
  fotos: {
    card: string;
    planta: string;
    detalle: string;
  };
  altHero: string;
  altPlanta: string;
  altDetalle: string;
  marquee: readonly string[];
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
    slug: "diagnostico",
    fase: "01",
    titulo: "Diagnóstico",
    duracion: "5 días en planta · Alcance cerrado · Sin obligación de continuar",
    resumen:
      "Cinco días en planta para localizar la restricción y cuantificar cuánto se pierde por mes.",
    resumenLargo:
      "Recorrido del material y la información, desde el pedido hasta el producto terminado. Medición propia, alcance cerrado y sin obligación de continuar.",
    resultado:
      "Que la dirección pueda decir en una frase dónde pierde y cuánto.",
    contexto:
      "El diagnóstico se hace en planta, con medición propia. Recorremos el material y la información desde que entra el pedido hasta que sale el producto terminado, medimos capacidad efectiva por etapa contra la demanda e identificamos la restricción del sistema y sus pérdidas.",
    paraQuien:
      "Dueños y directores de PyMEs industriales que quieren saber qué está limitando su resultado.",
    queSeMide:
      "Capacidad efectiva por etapa contra la demanda y las pérdidas de la restricción. También qué se mide hoy y qué decisiones se toman con eso.",
    indicadores: [
      "Paros no planeados",
      "Cambios de formato",
      "Retrabajos",
      "Capacidad",
    ],
    queSeHace: [
      "Recorrido real del material y de la información, de punta a punta.",
      "Medición de capacidad efectiva por etapa contra la demanda.",
      "Identificación de la restricción y de sus pérdidas: paros no planeados, cambios de formato, retrabajos.",
      "Entrevistas a operarios y supervisores. Revisión de qué se mide y qué decisiones se toman con eso.",
    ],
    entregable: "Informe ejecutivo y presentación a la dirección",
    entregableDetalle:
      "Restricción localizada y demostrada, pérdida mensual cuantificada en pesos con supuestos declarados, tres oportunidades priorizadas por impacto y esfuerzo, y las condiciones necesarias para capturarlas. Presentación a la dirección: 2 horas.",
    criterioExito:
      "Que la dirección pueda decir en una frase dónde pierde y cuánto.",
    notaComercial:
      "Si no se identifica una oportunidad verificable de al menos cinco veces el honorario, no se factura. Si el problema resulta ser comercial o financiero y no operativo, se dice y no se factura. Las primeras recomendaciones son las que no cuestan dinero: comprar equipamiento es lo último.",
    fotos: {
      card: "/servicios/diagnostico-de-planta.png",
      planta: "/servicios/diagnostico-de-planta-alt.png",
      detalle: "/servicios/diagnostico-de-planta-detalle.png",
    },
    altHero: "Tablero de control y registros de planta para el diagnóstico",
    altPlanta: "Tablero de OEE y cronómetro en el piso de planta",
    altDetalle: "Manómetros y planilla de relevamiento en el puesto de control",
    marquee: [
      "5 días en planta",
      "Restricción",
      "Pérdida mensual",
      "Alcance cerrado",
      "Capacidad efectiva",
      "Paros no planeados",
      "Cambios de formato",
      "Retrabajos",
      "Informe ejecutivo",
      "Sin obligación de continuar",
    ],
    icon: "clipboard-document-check",
  },
  {
    slug: "ejecucion",
    fase: "02",
    titulo: "Ejecución",
    duracion: "Ciclos de 3 meses · Renovable",
    resumen:
      "Tres prioridades para el trimestre, cada una con indicador y responsable. El trabajo se concentra en lo que traba la ejecución.",
    resumenLargo:
      "Sesión quincenal con la dirección, visita mensual a planta y seguimiento semanal de compromisos. Decisiones postergadas, delegación y prioridades que se desplazan ante cada urgencia.",
    resultado:
      "Compromisos cumplidos en fecha y movimiento verificable del indicador definido al inicio.",
    contexto:
      "Tres prioridades para el trimestre, cada una con indicador y responsable. El trabajo se concentra en lo que traba la ejecución: decisiones postergadas, delegación que no ocurre, prioridades que se desplazan ante cada urgencia. Marco ICF, con explicitación del cambio de rol al pasar a la recomendación técnica.",
    paraQuien:
      "Dirección que ya localizó la restricción y necesita mover el indicador en un trimestre.",
    queSeMide:
      "Indicador de cada prioridad del trimestre y cumplimiento de compromisos en fecha.",
    indicadores: ["Prioridades", "Indicadores", "Compromisos"],
    queSeHace: [
      "Tres prioridades para el trimestre, cada una con indicador y responsable.",
      "Sesión quincenal con la dirección y visita mensual a planta para verificar avance sobre el terreno.",
      "Seguimiento semanal de compromisos: decisiones, delegación y prioridades que no se corren.",
    ],
    entregable: "Tablero de prioridades con evidencia de movimiento",
    entregableDetalle:
      "Seguimiento documentado y evidencia de movimiento sobre los indicadores definidos al inicio del ciclo.",
    criterioExito:
      "Compromisos cumplidos en fecha y movimiento verificable del indicador definido al inicio.",
    notaComercial:
      "Honorario: abono fijo, o abono reducido más porcentaje del beneficio verificado a 12 meses con tope trimestral.",
    fotos: {
      card: "/servicios/implementacion.png",
      planta: "/servicios/implementacion-alt.png",
      detalle: "/servicios/implementacion-detalle.png",
    },
    altHero: "Documentación de línea y seguimiento de ejecución",
    altPlanta: "Tablero de hitos y seguimiento en un pasillo de planta",
    altDetalle: "Detalle de hitos y tarjetas de seguimiento en planta",
    marquee: [
      "Ciclos de 3 meses",
      "Tres prioridades",
      "Indicador",
      "Responsable",
      "Compromisos",
      "Sesión quincenal",
      "Visita mensual",
      "Tablero",
      "Ejecución",
      "Beneficio verificado",
    ],
    icon: "chart-bar",
  },
  {
    slug: "autonomia",
    fase: "03",
    titulo: "Autonomía",
    duracion: "3 a 6 meses · Presencia decreciente",
    resumen:
      "Formación de supervisores y jefes de turno hasta que la conducción sea autónoma.",
    resumenLargo:
      "Estándares, gestión visual e indicadores de turno. Rutina de gestión diaria: qué se revisa, con quién, con qué dato, a qué hora. Acompañamiento con presencia decreciente.",
    resultado:
      "Que a los 90 días de la última visita la rutina siga funcionando.",
    contexto:
      "Formación de supervisores y jefes de turno sobre los problemas concretos de esa planta. Estándares de trabajo, gestión visual e indicadores de turno. Rutina de gestión diaria: qué se revisa, con quién, con qué dato, a qué hora. Acompañamiento hasta que la conducción sea autónoma.",
    paraQuien:
      "Plantas que ya movieron el indicador y necesitan que la rutina quede en el equipo propio.",
    queSeMide:
      "Que la rutina de gestión diaria se sostenga sin el estudio. Se verifica con una visita de control incluida.",
    indicadores: ["Estándares", "Tablero operativo", "Reunión diaria"],
    queSeHace: [
      "Formación de supervisores y jefes de turno sobre los problemas concretos de esa planta.",
      "Estándares de trabajo, gestión visual e indicadores de turno.",
      "Rutina de gestión diaria y acompañamiento hasta que la conducción sea autónoma.",
    ],
    entregable: "Estándares, tablero operativo y reunión diaria propia",
    entregableDetalle:
      "Estándares documentados, tablero operativo en uso y una reunión diaria conducida por personal propio. Visita de control incluida para verificar que la rutina sigue a los 90 días de la última visita.",
    criterioExito:
      "Que a los 90 días de la última visita la rutina siga funcionando.",
    notaComercial:
      "La presencia decrece por diseño. Si al cabo de un año seguimos siendo necesarios, el trabajo no cumplió su objetivo.",
    fotos: {
      card: "/servicios/tpm-5s.png",
      planta: "/servicios/tpm-5s-alt.png",
      detalle: "/servicios/tpm-5s-detalle.png",
    },
    altHero: "Tablero de sombras y orden de piso para sostener la rutina",
    altPlanta: "Pasillos marcados, estación de limpieza y gestión visual",
    altDetalle: "Detalle de tablero de sombras y cinta de piso",
    marquee: [
      "Presencia decreciente",
      "Estándares",
      "Gestión visual",
      "Indicadores de turno",
      "Reunión diaria",
      "Supervisores",
      "Tablero operativo",
      "90 días",
      "Formación",
      "Autonomía",
    ],
    icon: "squares-2x2",
  },
] as const satisfies readonly Servicio[];

export function getServicio(slug: string) {
  return SERVICIOS.find((s) => s.slug === slug);
}

export function slugsServicios(): string[] {
  return SERVICIOS.map((s) => s.slug);
}

export function imagenesServicio(slug: string) {
  const servicio = getServicio(slug);
  if (servicio) return servicio.fotos;
  return {
    card: `/servicios/${slug}.png`,
    planta: `/servicios/${slug}-alt.png`,
    detalle: `/servicios/${slug}-detalle.png`,
  } as const;
}
