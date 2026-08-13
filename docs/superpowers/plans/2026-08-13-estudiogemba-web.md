# Estudio Gemba Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sitio institucional Next.js de Estudio Gemba (9 rutas, formularios de presupuesto/newsletter hacia WhatsApp o email, SEO) listo para cargar contacto en un solo archivo.

**Architecture:** App Router con páginas estáticas y un Route Handler `POST /api/consulta`. La lógica de validación y de canal de salida vive en `src/lib` (inyectable, testeable sin Next). UI corporativa navy/blanco; logo del cliente en `public/`.

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Geist + Heroicons + Vitest + Resend (opcional, solo si hay email y API key).

## Global Constraints

- Copy en español rioplatense formal; prohibido “¡Genial!”, emojis, “Awesome”, KPIs inventados, bios, stock de equipos sonrientes.
- Colores: navy `#0C1220` + blanco `#FFFFFF`. Sin acento, sin degradados, sin `border-radius` en botones/marcos.
- Tipografía Geist; títulos uppercase + tracking amplio.
- `html lang="es-AR"`. Dominio canónico `https://estudiogemba.com.ar`.
- Contacto solo en `src/lib/contacto.ts` (cadenas vacías = canal no publicado).
- Horario: `09:00 a 20:00`. Zona: `Zona Sur, Buenos Aires · Argentina`.
- Git: inicializar **solo** en `c:\Users\Principal\OneDrive\Escritorio\Estudio Gemba`. No commitear el `.git` de `C:\Users\Principal`.
- v1 sin DB, CMS, blog, analytics, inglés.

## File map

| File | Responsibility |
| --- | --- |
| `src/lib/contacto.ts` | Config email/whatsapp/linkedin/horario/zona + `canalesDisponibles` |
| `src/lib/servicios.ts` | Catálogo de 5 servicios (slug, copy, icono) |
| `src/lib/consulta.ts` | Tipos, `validateConsulta`, `formatConsultaText`, `buildWhatsAppUrl`, `resolverEnvio` |
| `src/lib/consulta.test.ts` | Tests de validación, texto, wa.me, resolver |
| `src/lib/contacto.test.ts` | Tests de canales |
| `src/lib/servicios.test.ts` | Tests de catálogo y lookup |
| `src/app/api/consulta/route.ts` | POST: parse JSON → validate → resolverEnvio |
| `src/app/api/consulta/route.test.ts` | Tests HTTP del handler |
| `src/components/SiteHeader.tsx` | Nav + CTA |
| `src/components/SiteFooter.tsx` | Columnas + newsletter corto + LinkedIn |
| `src/components/ServiceCard.tsx` | Tarjeta con hover de borde |
| `src/components/MethodSteps.tsx` | 4 pasos |
| `src/components/PageHero.tsx` | H1 interior |
| `src/components/CtaBand.tsx` | Banda navy |
| `src/components/BudgetForm.tsx` | Form presupuesto |
| `src/components/NewsletterForm.tsx` | Form newsletter |
| `src/components/ContactConfigBanner.tsx` | Banner solo `development` |
| `src/components/JsonLd.tsx` | ProfessionalService |
| `src/app/layout.tsx` | Shell, metadata template, skip link |
| `src/app/page.tsx` | Home |
| `src/app/servicios/page.tsx` | Catálogo |
| `src/app/servicios/[slug]/page.tsx` | Fichas (generateStaticParams) |
| `src/app/sobre-nosotros/page.tsx` | Institucional |
| `src/app/contacto/page.tsx` | Presupuesto + datos |
| `src/app/not-found.tsx` | 404 |
| `src/app/sitemap.ts` | Sitemap |
| `src/app/robots.ts` | Robots |
| `src/app/globals.css` | Tokens |
| `public/logo-gemba.png` | Logo cliente |
| `vitest.config.ts` | Runner |

---

### Task 1: Scaffold Next.js + Vitest + git del proyecto

**Files:**
- Create: app Next.js en la raíz del workspace (junto a `docs/`)
- Create: `vitest.config.ts`
- Create: `src/lib/.gitkeep` (si hace falta)
- Test: `npm test` corre Vitest vacío/ok

**Interfaces:**
- Consumes: nada
- Produces: proyecto Next con `src/app`, Tailwind, TypeScript, script `"test": "vitest run"`

- [ ] **Step 1: Inicializar git solo en este folder**

```bash
cd "c:\Users\Principal\OneDrive\Escritorio\Estudio Gemba"
git rev-parse --show-toplevel
```

Expected: si imprime `C:/Users/Principal`, **no** usar ese repo.

```bash
git init
git rev-parse --show-toplevel
```

Expected: `.../Estudio Gemba`

Crear `.gitignore` estándar Node/Next si no existe (`node_modules`, `.next`, `.env*`).

- [ ] **Step 2: Scaffold Next.js en el directorio actual**

El folder ya tiene `docs/`. Usar:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes
```

Si pide confirmación por directorio no vacío, aceptar. No borrar `docs/`.

- [ ] **Step 3: Instalar test runner, iconos y Resend**

```bash
npm install @heroicons/react resend
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths
```

`package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Copiar logo**

Copiar el PNG del logo del cliente a `public/logo-gemba.png`.

Origen (si sigue ahí):

`C:\Users\Principal\.cursor\projects\c-Users-Principal-OneDrive-Escritorio-Estudio-Gemba\assets\c__Users_Principal_AppData_Roaming_Cursor_User_workspaceStorage_fad994389b4475adc53c2b0a427bd999_images_image-f8e71be3-7061-48a3-bddb-277bc873d5c9.png`

- [ ] **Step 5: Verificar scaffold**

```bash
npm test
npx tsc --noEmit
```

Expected: Vitest “No test files found” o pass; `tsc` exit 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js, Vitest y logo Estudio Gemba"
```

---

### Task 2: Config de contacto

**Files:**
- Create: `src/lib/contacto.ts`
- Test: `src/lib/contacto.test.ts`

**Interfaces:**
- Consumes: nada
- Produces:

```ts
export type ContactoConfig = {
  email: string;
  whatsapp: string;
  linkedin: string;
  horario: string;
  zona: string;
};

export const contacto: ContactoConfig;

export function canalesDisponibles(c: ContactoConfig): {
  email: boolean;
  whatsapp: boolean;
  linkedin: boolean;
};
```

`whatsapp` es E.164 **sin** `+` (ej. `54911XXXXXXXX`). Cadenas vacías = no publicado.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { canalesDisponibles, contacto } from "./contacto";

describe("canalesDisponibles", () => {
  it("marca todos en false cuando las cadenas están vacías", () => {
    expect(
      canalesDisponibles({
        email: "",
        whatsapp: "",
        linkedin: "",
        horario: "09:00 a 20:00",
        zona: "Zona Sur, Buenos Aires · Argentina",
      }),
    ).toEqual({ email: false, whatsapp: false, linkedin: false });
  });

  it("ignora espacios", () => {
    expect(
      canalesDisponibles({
        email: "  ",
        whatsapp: "54911",
        linkedin: " https://linkedin.com/company/x ",
        horario: "",
        zona: "",
      }),
    ).toEqual({ email: false, whatsapp: true, linkedin: true });
  });
});

describe("contacto v1", () => {
  it("arranca sin canales publicados", () => {
    expect(contacto.email).toBe("");
    expect(contacto.whatsapp).toBe("");
    expect(contacto.linkedin).toBe("");
    expect(contacto.horario).toBe("09:00 a 20:00");
    expect(contacto.zona).toBe("Zona Sur, Buenos Aires · Argentina");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/contacto.test.ts`

Expected: FAIL (módulo no existe).

- [ ] **Step 3: Write minimal implementation**

```ts
export type ContactoConfig = {
  email: string;
  whatsapp: string;
  linkedin: string;
  horario: string;
  zona: string;
};

export const contacto: ContactoConfig = {
  email: "",
  whatsapp: "",
  linkedin: "",
  horario: "09:00 a 20:00",
  zona: "Zona Sur, Buenos Aires · Argentina",
};

export function canalesDisponibles(c: ContactoConfig) {
  return {
    email: c.email.trim().length > 0,
    whatsapp: c.whatsapp.trim().length > 0,
    linkedin: c.linkedin.trim().length > 0,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/contacto.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/contacto.ts src/lib/contacto.test.ts
git commit -m "feat: config de contacto con canales vacíos"
```

---

### Task 3: Catálogo de servicios

**Files:**
- Create: `src/lib/servicios.ts`
- Test: `src/lib/servicios.test.ts`

**Interfaces:**
- Consumes: nada
- Produces:

```ts
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
  icon: "clipboard-document-check" | "chart-bar" | "clock" | "squares-2x2" | "cog-6-tooth";
};

export const SERVICIOS: readonly Servicio[];
export const SERVICIO_OTRO = "no-estoy-seguro";
export function getServicio(slug: string): Servicio | undefined;
export function slugsServicios(): string[];
```

Slugs **exactos:** `diagnostico-de-planta`, `reduccion-de-perdidas`, `smed-cambio-rapido`, `tpm-5s`, `implementacion`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getServicio, SERVICIOS, slugsServicios } from "./servicios";

describe("SERVICIOS", () => {
  it("tiene exactamente 5 líneas con slugs del spec", () => {
    expect(slugsServicios()).toEqual([
      "diagnostico-de-planta",
      "reduccion-de-perdidas",
      "smed-cambio-rapido",
      "tpm-5s",
      "implementacion",
    ]);
    expect(SERVICIOS).toHaveLength(5);
  });

  it("getServicio encuentra por slug y no inventa", () => {
    expect(getServicio("tpm-5s")?.titulo).toBe("TPM y 5S");
    expect(getServicio("inexistente")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/servicios.test.ts`

Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

Incluir el copy institucional completo (no lorem). Valores:

```ts
export const SERVICIO_OTRO = "no-estoy-seguro";

export const SERVICIOS = [
  {
    slug: "diagnostico-de-planta",
    titulo: "Diagnóstico de planta",
    resumen: "Baseline numérico de OEE, scrap y paradas antes de proponer herramientas.",
    resumenLargo:
      "Medimos la operación con datos de planta. El diagnóstico ordena pérdidas y deja un mapa priorizado para decidir dónde intervenir.",
    resultado: "Una línea con números compartidos: qué se pierde, cuánto y dónde.",
    paraQuien: "Jefes de planta y directores de operaciones de PyMEs industriales que necesitan un punto de partida medible.",
    queSeMide: "OEE, tasas de scrap, tiempos muertos, paradas y cuellos de botella visibles en piso.",
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
    resumen: "Ataque a scrap, retrabajo y cuellos de botella a partir del diagnóstico.",
    resumenLargo:
      "Intervenimos las pérdidas que el número ya señaló. El trabajo es contrapuntos en la línea, no un programa genérico de 'mejora continua'.",
    resultado: "Menor scrap y menos retrabajo, con seguimiento de la tasa en el tiempo.",
    paraQuien: "Plantas que ya ven el desperdicio pero no tienen un plan atado a indicadores.",
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
    paraQuien: "Líneas con muchos cambios de formato o utillaje y disponibilidad baja.",
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
    resumen: "Orden, inspección básica y disciplina de piso, diseñados para la planta real.",
    resumenLargo:
      "No es una auditoría cosmética. 5S y mantenimiento autónomo se arman para que se sostengan en el turno.",
    resultado: "Piso legible, fallas menores detectadas antes y adherencia medible al rutinario.",
    paraQuien: "PyMEs que necesitan disciplina operativa sin un programa TPM corporativo maduro.",
    queSeMide: "Adherencia al rutinario, hallazgos de inspección, tiempos de búsqueda/desorden.",
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
    resumen: "Bajar el plan a la línea, con responsables y métricas de seguimiento.",
    resumenLargo:
      "El valor está en el piso. Acompañamos hitos, indicadores y la cadencia de revisión con el equipo de planta.",
    resultado: "Un plan ejecutado en Gemba, no un informe que queda en el escritorio.",
    paraQuien: "Dirección de operaciones que ya tiene diagnóstico o plan y necesita implementación.",
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

export function slugsServicios() {
  return SERVICIOS.map((s) => s.slug);
}
```

Exportar también el type `Servicio` (el `as const satisfies` requiere declarar `Servicio` antes).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/servicios.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/servicios.ts src/lib/servicios.test.ts
git commit -m "feat: catálogo de cinco servicios de planta"
```

---

### Task 4: Validación y armado de consulta

**Files:**
- Create: `src/lib/consulta.ts`
- Test: `src/lib/consulta.test.ts`

**Interfaces:**
- Consumes: `SERVICIO_OTRO`, `slugsServicios()` de `./servicios`; `ContactoConfig` de `./contacto`
- Produces: ver firmas abajo

```ts
export type PreferenciaRespuesta = "email" | "whatsapp";

export type PresupuestoPayload = {
  tipo: "presupuesto";
  empresa: string;
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  planta: string;
  servicio: string;
  mensaje: string;
  preferencia: PreferenciaRespuesta;
};

export type NewsletterPayload = {
  tipo: "newsletter";
  nombre: string;
  email: string;
  sector: string;
};

export type ConsultaPayload = PresupuestoPayload | NewsletterPayload;
export type FieldErrors = Record<string, string>;

export function validateConsulta(
  body: unknown,
): { ok: true; data: ConsultaPayload } | { ok: false; errors: FieldErrors };

export function formatConsultaText(data: ConsultaPayload): string;

export function buildWhatsAppUrl(phoneE164: string, text: string): string;

export type SendEmail = (args: {
  to: string;
  subject: string;
  text: string;
}) => Promise<void>;

export type EnvioResultado =
  | { kind: "emailed" }
  | { kind: "whatsapp"; url: string }
  | { kind: "queued" }
  | { kind: "provider_error" };

export function resolverEnvio(
  data: ConsultaPayload,
  contacto: ContactoConfig,
  opts: { sendEmail?: SendEmail; log?: (data: ConsultaPayload) => void },
): Promise<EnvioResultado>;
```

Reglas de validación:

- Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Presupuesto: todos los campos de texto trim no vacíos; `mensaje` ≤ 2000; `preferencia` ∈ {email, whatsapp}; `servicio` ∈ slugs o `no-estoy-seguro`
- Newsletter: `nombre`, `email`; `sector` opcional (string, default `""`)
- Errores en español: `"Completá este campo."`, `"Ingresá un email válido."`, `"El mensaje no puede superar 2000 caracteres."`

`resolverEnvio`:

1. Si presupuesto + preferencia `email`, **o** newsletter: si `contacto.email` y `opts.sendEmail` existen, llamar sendEmail. Si throw → `provider_error`. Si no hay email/sendEmail, seguir.
2. Si presupuesto + preferencia `whatsapp`, **o** fallback del paso 1: si `contacto.whatsapp`, devolver `{ kind: "whatsapp", url }`.
3. Si no: `opts.log?.(data)` y `{ kind: "queued" }`.

Asunto mail presupuesto: `Presupuesto — {empresa}`. Newsletter: `Newsletter — {nombre}`. `to` = `contacto.email`.

`buildWhatsAppUrl`: `https://wa.me/${phone.trim()}?text=${encodeURIComponent(text)}`

- [ ] **Step 1: Write the failing test**

Cubrir al menos:

- presupuesto vacío → errors en empresa, nombre, email, etc.
- email mal formado
- mensaje de 2001 chars
- servicio inválido
- newsletter válido sin sector
- `buildWhatsAppUrl` encodea espacios
- `resolverEnvio` queued si canales vacíos
- `resolverEnvio` whatsapp si preferencia whatsapp y hay número
- `resolverEnvio` emailed si newsletter + email + sendEmail
- `resolverEnvio` provider_error si sendEmail rechaza
- `formatConsultaText` incluye empresa y tipo

Ejemplo nuclear:

```ts
import { describe, expect, it, vi } from "vitest";
import { contacto } from "./contacto";
import {
  buildWhatsAppUrl,
  formatConsultaText,
  resolverEnvio,
  validateConsulta,
} from "./consulta";

const presupuestoOk = {
  tipo: "presupuesto",
  empresa: "Acme SA",
  nombre: "Ana Pérez",
  cargo: "Jefa de planta",
  email: "ana@acme.com",
  telefono: "1144445555",
  planta: "Lomas de Zamora",
  servicio: "diagnostico-de-planta",
  mensaje: "Necesitamos baseline de OEE.",
  preferencia: "email",
};

describe("validateConsulta", () => {
  it("rechaza presupuesto vacío", () => {
    const r = validateConsulta({ tipo: "presupuesto" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.empresa).toBe("Completá este campo.");
  });

  it("acepta presupuesto válido", () => {
    const r = validateConsulta(presupuestoOk);
    expect(r).toEqual({ ok: true, data: presupuestoOk });
  });

  it("rechaza email inválido", () => {
    const r = validateConsulta({ ...presupuestoOk, email: "ana@" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBe("Ingresá un email válido.");
  });
});

describe("resolverEnvio", () => {
  it("queued cuando no hay canales", async () => {
    const log = vi.fn();
    const r = await resolverEnvio(presupuestoOk, contacto, { log });
    expect(r).toEqual({ kind: "queued" });
    expect(log).toHaveBeenCalledOnce();
  });

  it("whatsapp cuando hay número y preferencia whatsapp", async () => {
    const r = await resolverEnvio(
      { ...presupuestoOk, preferencia: "whatsapp" },
      { ...contacto, whatsapp: "5491112345678" },
      {},
    );
    expect(r.kind).toBe("whatsapp");
    if (r.kind === "whatsapp") {
      expect(r.url).toMatch(/^https:\/\/wa\.me\/5491112345678\?text=/);
    }
  });
});

describe("buildWhatsAppUrl", () => {
  it("encodea el texto", () => {
    expect(buildWhatsAppUrl("54911", "Hola mundo")).toBe(
      "https://wa.me/54911?text=Hola%20mundo",
    );
  });
});
```

Agregar casos newsletter, provider_error y formatConsultaText en el mismo archivo.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/consulta.test.ts`

Expected: FAIL

- [ ] **Step 3: Write minimal implementation** in `src/lib/consulta.ts` (todas las funciones de la interfaz). No usar `any`. Parsear `body` como `Record<string, unknown>`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/consulta.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/consulta.ts src/lib/consulta.test.ts
git commit -m "feat: validación y resolución de canal de consulta"
```

---

### Task 5: Route Handler POST /api/consulta

**Files:**
- Create: `src/app/api/consulta/route.ts`
- Test: `src/app/api/consulta/route.test.ts`

**Interfaces:**
- Consumes: `validateConsulta`, `resolverEnvio`, `formatConsultaText`, `contacto`
- Produces: `POST(request: Request): Promise<Response>`

Mapeo HTTP:

- validate fail → `400` `{ ok: false, errors }`
- emailed → `200` `{ ok: true, emailed: true }`
- whatsapp → `200` `{ ok: true, whatsappUrl }`
- queued → `200` `{ ok: true, queued: true }`
- provider_error → `503` `{ ok: false, message: "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email." }`
- JSON inválido → `400` `{ ok: false, errors: { _form: "No pudimos leer la consulta." } }`

`sendEmail` real: si `process.env.RESEND_API_KEY` y `contacto.email`, usar Resend `from: "Estudio Gemba <hola@estudiogemba.com.ar>"` **solo cuando exista dominio verificado**; en v1 si no hay key, pasar `sendEmail: undefined`. No inventar from no verificado: si hay key, `from` = `contacto.email` (el estudio se escribe a sí mismo) o `Estudio Gemba <${contacto.email}>`.

En queued, `console.info("[consulta queued]", data)` vía `log`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/consulta", () => {
  it("400 si el body no es JSON", async () => {
    const res = await POST(new Request("http://localhost/api/consulta", { method: "POST", body: "no-json" }));
    expect(res.status).toBe(400);
  });

  it("400 si faltan campos", async () => {
    const res = await POST(
      new Request("http://localhost/api/consulta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tipo: "newsletter", nombre: "", email: "" }),
      }),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.errors.email).toBeTruthy();
  });

  it("200 queued cuando no hay canales", async () => {
    const res = await POST(
      new Request("http://localhost/api/consulta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tipo: "newsletter",
          nombre: "Ana",
          email: "ana@acme.com",
          sector: "metalúrgica",
        }),
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, queued: true });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/api/consulta/route.test.ts`

Expected: FAIL

- [ ] **Step 3: Write the route**

```ts
import { NextResponse } from "next/server";
import { contacto } from "@/lib/contacto";
import {
  formatConsultaText,
  resolverEnvio,
  validateConsulta,
  type SendEmail,
} from "@/lib/consulta";

function sendEmailFromEnv(): SendEmail | undefined {
  const key = process.env.RESEND_API_KEY;
  if (!key || !contacto.email.trim()) return undefined;
  return async ({ to, subject, text }) => {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: `Estudio Gemba <${contacto.email.trim()}>`,
      to,
      subject,
      text,
    });
    if (result.error) throw new Error(result.error.message);
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: "No pudimos leer la consulta." } },
      { status: 400 },
    );
  }

  const parsed = validateConsulta(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }

  const result = await resolverEnvio(parsed.data, contacto, {
    sendEmail: sendEmailFromEnv(),
    log: (data) => console.info("[consulta queued]", data),
  });

  if (result.kind === "provider_error") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.",
      },
      { status: 503 },
    );
  }
  if (result.kind === "whatsapp") {
    return NextResponse.json({ ok: true, whatsappUrl: result.url });
  }
  if (result.kind === "emailed") {
    return NextResponse.json({ ok: true, emailed: true });
  }
  return NextResponse.json({ ok: true, queued: true });
}
```

`formatConsultaText` se usa dentro de `resolverEnvio` al armar mail y wa.me (no hace falta en la route si ya está ahí).

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/app/api/consulta/route.test.ts src/lib/consulta.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/api/consulta/route.ts src/app/api/consulta/route.test.ts src/lib/consulta.ts
git commit -m "feat: endpoint POST /api/consulta"
```

---

### Task 6: Tokens, layout, header y footer

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/ContactConfigBanner.tsx`
- Create: `src/components/NewsletterForm.tsx` (versión mínima para el footer; Task 8 la completa si hace falta extraer)

**Interfaces:**
- Consumes: `contacto`, `canalesDisponibles`, `SERVICIOS`
- Produces: shell visual corporativo

Tokens CSS:

```css
:root {
  --navy: #0c1220;
  --white: #ffffff;
  --paper: #f4f4f2;
}
```

`rounded-none` en botones, inputs, cards. Header `sticky top-0` fondo blanco `border-b border-navy/15`. Footer fondo `--navy` texto blanco.

Header links: `/servicios`, `/sobre-nosotros`, `/contacto`. Botón “Solicitar presupuesto” → `/contacto`. Logo: `Image` `src="/logo-gemba.png"` `alt="Estudio Gemba"` altura ~40px.

Skip link: “Ir al contenido” → `#contenido`.

`metadata`:

```ts
export const metadata = {
  metadataBase: new URL("https://estudiogemba.com.ar"),
  title: { default: "Estudio Gemba", template: "%s | Estudio Gemba" },
  description:
    "Ingeniería y optimización de procesos para PyMEs industriales. Diagnóstico con OEE, scrap y tiempos muertos. Buenos Aires, Zona Sur.",
};
```

`ContactConfigBanner`: `process.env.NODE_ENV === "development" && !canales.email && !canales.whatsapp` → texto “Canales de contacto aún no configurados (src/lib/contacto.ts).”

LinkedIn: si no hay URL, `<span title="LinkedIn — próximamente">` con icono + texto “LinkedIn”; no usar URL falsa.

Footer newsletter: nombre + email (sin sector). Reutiliza `NewsletterForm` `variant="footer"`.

Motion: ninguna en header/footer.

- [ ] **Step 1: Implementar CSS + layout + header/footer + banner**

- [ ] **Step 2: `npm run dev` y abrir `/`**

Expected: header sticky, footer navy, logo visible, nav, skip link. Sin radius. Sin colores ajenos al navy/blanco/paper.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components
git commit -m "feat: layout institucional header y footer"
```

---

### Task 7: Componentes de página

**Files:**
- Create: `src/components/ServiceCard.tsx`
- Create: `src/components/MethodSteps.tsx`
- Create: `src/components/PageHero.tsx`
- Create: `src/components/CtaBand.tsx`
- Create: `src/components/JsonLd.tsx`

**Interfaces:**

```tsx
ServiceCard({ slug, variant }: { slug: string; variant: "home" | "catalog" })
MethodSteps()
PageHero({ title, description }: { title: string; description: string })
CtaBand({ title, href }: { title: string; href: string })
JsonLd()
```

`ServiceCard`: icono Heroicons outline 24 según `icon` del catálogo. Hover: borde que se dibuja (`hover:border-[var(--navy)]` + underline que crece en “Ver más”). Sin scale ni bounce.

`MethodSteps` textos fijos: Diagnóstico numérico → Plan de acción → Implementación en Gemba → Seguimiento medible.

`JsonLd`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Estudio Gemba",
  "url": "https://estudiogemba.com.ar",
  "areaServed": { "@type": "AdministrativeArea", "name": "Buenos Aires" },
  "serviceType": "Ingeniería y optimización de procesos industriales"
}
```

Sin `aggregateRating`.

- [ ] **Step 1: Implementar los cinco componentes**

Mapa de iconos:

```ts
import {
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ClockIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`

Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components
git commit -m "feat: tarjetas, método, CTA y JSON-LD"
```

---

### Task 8: Formularios cliente

**Files:**
- Create: `src/components/BudgetForm.tsx`
- Create: `src/components/NewsletterForm.tsx` (completar)

**Interfaces:**

```tsx
BudgetForm({ servicioInicial?: string })
NewsletterForm({ variant: "page" | "footer" })
```

Cliente (`"use client"`). POST `/api/consulta`. Labels visibles (no placeholder-only). Errores bajo el campo, borde negro. Radio preferencia: default `email`; si `canales.whatsapp` mostrar WhatsApp. Si no hay WhatsApp, el radio WhatsApp deshabilitado o oculto.

Éxito: reemplazar el form por:

- queued: “Recibimos tus datos. Cuando el canal de contacto esté activo, te responderemos.”
- emailed: “Recibimos tu consulta. Te respondemos por email.”
- whatsapp: mismo bloque **y** `window.open(whatsappUrl, "_blank", "noopener,noreferrer")`

5xx: “No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.”

`BudgetForm`: leer `servicioInicial` (desde `?servicio=` en la page). Select opciones = 5 títulos + “No estoy seguro” (`no-estoy-seguro`).

Campos presupuesto exactos del spec. Newsletter page: nombre, email, sector opcional. Footer: nombre, email.

- [ ] **Step 1: Implementar ambos forms**

Fetch:

```ts
const res = await fetch("/api/consulta", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

Si `res.status === 400`, pintar `errors` por campo.

- [ ] **Step 2: Prueba manual rápida** (dev server)

- Submit newsletter vacío → “Completá este campo.”
- Email `ana@` → “Ingresá un email válido.”
- Válido → mensaje queued (canales vacíos).

- [ ] **Step 3: Commit**

```bash
git add src/components/BudgetForm.tsx src/components/NewsletterForm.tsx
git commit -m "feat: formularios de presupuesto y newsletter"
```

---

### Task 9: Páginas (9 rutas + 404)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/servicios/page.tsx`
- Create: `src/app/servicios/[slug]/page.tsx`
- Create: `src/app/sobre-nosotros/page.tsx`
- Create: `src/app/contacto/page.tsx`
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: todos los componentes y `SERVICIOS`
- Produces: las 9 rutas del spec

Home orden fijo:

1. Hero viewport: h1 “Optimización de procesos con datos de planta, no con recetas genéricas”. Sub: “Para jefes de planta y directores de operaciones de PyMEs industriales que necesitan resultados medibles en la línea.” CTA primario `/contacto`, secundario `/servicios`. Animación: `animate-in` CSS `opacity` 0→1 y `translateY(8px)` 400ms **solo en el h1**.
2. Franja: OEE · Scrap · Tiempos muertos · Disponibilidad (sin porcentajes).
3. 5 `ServiceCard` variant home
4. `MethodSteps`
5. Bloque institucional 3–4 oraciones + link Sobre nosotros
6. `CtaBand`
7. `NewsletterForm` variant page

`/servicios/[slug]/page.tsx`:

```ts
export function generateStaticParams() {
  return slugsServicios().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { /* title = servicio.titulo */ }
```

Si slug inválido: `notFound()`. CTA a `/contacto?servicio={slug}`.

Sobre nosotros: 5 secciones del spec, sin nombres ni fotos.

Contacto: grid 2 cols desktop. Izquierda `BudgetForm`. Derecha horario, zona, email/whatsapp **solo si** `canalesDisponibles`, LinkedIn próximamente, newsletter.

404: “No encontramos esa página.” Links a `/` y `/contacto`.

Un solo `h1` por página.

- [ ] **Step 1: Implementar las páginas con `metadata` único por ruta**

Títulos:

- Home: default layout
- Servicios: `Servicios`
- Cada ficha: `titulo`
- Sobre nosotros: `Sobre nosotros`
- Contacto: `Contacto`

- [ ] **Step 2: `npm run build`**

Expected: 9 páginas estáticas + `/api/consulta`. Sin errores. `[slug]` pre-renderiza 5 paths.

- [ ] **Step 3: Recorrer en el browser las 9 URLs + una 404 (`/no-existe`)**

Expected: header/footer consistentes; `?servicio=tpm-5s` prellena el select.

- [ ] **Step 4: Commit**

```bash
git add src/app
git commit -m "feat: páginas institucionales y fichas de servicio"
```

---

### Task 10: SEO sitemap/robots y accesibilidad

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` (JsonLd + skip link si faltó)
- Modify: focus styles en `globals.css` (`outline: 2px solid var(--navy); outline-offset: 2px`)

**Interfaces:**

```ts
// sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap
// incluye /, /servicios, 5 slugs, /sobre-nosotros, /contacto
// robots.ts allow: /, sitemap: https://estudiogemba.com.ar/sitemap.xml
```

- [ ] **Step 1: Implementar sitemap y robots**

- [ ] **Step 2: `npm run build` y abrir `.next/...` o `/sitemap.xml` en dev**

Expected: 9 URLs canónicas `https://estudiogemba.com.ar/...`

- [ ] **Step 3: Chequeo a11y mínimo**

Tab por header y forms: foco visible. Labels con `htmlFor`. Iconos de tarjeta `aria-hidden`. LinkedIn con texto visible “LinkedIn”.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx src/app/globals.css
git commit -m "feat: sitemap, robots y foco visible"
```

---

### Task 11: Aceptación v1

**Files:** ninguna nueva salvo fixes.

- [ ] **Step 1: Correr tests y build**

```bash
npm test
npm run build
```

Expected: todos PASS; build exit 0.

- [ ] **Step 2: Checklist del spec §12**

Desktop ≥1280 y móvil 375:

1. 9 rutas + header/footer
2. CTA presupuesto → `/contacto`; `?servicio=` prellena
3. Presupuesto vacío / email malo / válido queued
4. Newsletter igual
5. (Opcional) temporalmente setear `whatsapp` en `contacto.ts`, enviar con preferencia WhatsApp, confirmar `wa.me`, **revertir a `""`**
6. LinkedIn “próximamente”
7. 404 propia
8. Lighthouse móvil home y contacto: SEO ≥ 90, A11y ≥ 90

- [ ] **Step 3: Commit de fixes si hubo**

```bash
git add -A
git commit -m "fix: ajustes de aceptación v1"
```

---

## Spec coverage (self-review)

| Spec | Task |
| --- | --- |
| Objetivo / posicionamiento / copy | 9 (contenido), Global Constraints |
| Stack Next+TW+Heroicons+logo | 1, 6, 7 |
| 9 rutas + 404 | 9 |
| Header/footer/nav | 6 |
| Visual navy/blanco/Geist/hover | 6, 7 |
| Home orden 1–7 | 9 |
| Fichas + `?servicio=` | 8, 9 |
| Sobre nosotros sin bios | 9 |
| Componentes listados | 6–8 |
| `contacto.ts` | 2 |
| Validación + resolver + API | 4, 5 |
| Errores UI | 8 |
| SEO metadata/OG/sitemap/robots/JSON-LD | 6, 7, 9, 10 |
| A11y | 6, 10 |
| Aceptación Lighthouse | 11 |
| Fuera de alcance | no hay tasks de blog/CMS/DB |

No se implementa Google Analytics ni casos de éxito con métricas.
