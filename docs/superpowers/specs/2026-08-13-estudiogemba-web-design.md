# Estudio Gemba — Sitio web institucional

Fecha: 2026-08-13  
Estado: aprobado en conversación; pendiente de revisión del archivo  
Dominio: estudiogemba.com.ar

## 1. Objetivo

Sitio corporativo de Estudio Gemba para que PyMEs industriales (ingenieros, jefes de planta, directores de operaciones) entiendan el servicio y **soliciten presupuesto**. Canal de conversión: formularios que envían a WhatsApp y/o email (datos de contacto se cargan después). Newsletter con el mismo mecanismo.

No es un e-commerce, ni un blog, ni una app con login.

## 2. Posicionamiento

Estudio técnico de **ingeniería y optimización de procesos** para PyMEs industriales. Enfoque: rigor analítico y datos de planta (OEE, scrap, tiempos muertos). Ingeniería práctica e implementación en Gemba, no recetas genéricas.

- Marca: institucional, sin bios ni fotos de equipo en esta versión.
- Operación: Buenos Aires, Zona Sur (local); también resto de Argentina.
- Horario publicado: 09:00 a 20:00.
- Tono: español rioplatense formal, preciso, de informe técnico. Sin copy de startup, sin exclamaciones de marketing.

## 3. Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Sitio principalmente estático (SSG)
- Un Route Handler para presupuesto y newsletter
- Heroicons (outline, 24px) para iconografía
- Logo provisto por el cliente (monograma EG + ESTUDIO / GEMBA)
- Configuración de contacto en un único archivo `src/lib/contacto.ts`
- Deploy pensado para `estudiogemba.com.ar` (Vercel o hosting que apunte el dominio)

## 4. Mapa de rutas

| Ruta | Propósito |
| --- | --- |
| `/` | Landing: propuesta, vocabulario técnico, servicios, método, CTA, newsletter |
| `/servicios` | Catálogo de las 5 líneas |
| `/servicios/diagnostico-de-planta` | Diagnóstico numérico (OEE, scrap, paradas) |
| `/servicios/reduccion-de-perdidas` | Scrap, retrabajo, cuellos de botella |
| `/servicios/smed-cambio-rapido` | Setups y disponibilidad |
| `/servicios/tpm-5s` | 5S y TPM práctico en piso |
| `/servicios/implementacion` | Implementación y seguimiento medible |
| `/sobre-nosotros` | Misión, método, para quién, cobertura geográfica |
| `/contacto` | Presupuesto + newsletter + datos de contacto |

No hay página `/newsletter`. El formulario de suscripción vive en home, contacto y footer.

Página `not-found`: 404 institucional (mensaje sobrio + enlace a home y contacto).

## 5. Navegación

**Header** (fijo, fondo blanco, borde inferior 1px):

- Izquierda: logo compacto (monograma EG + GEMBA). Enlaza a `/`.
- Derecha: Servicios · Sobre nosotros · Contacto · botón negro **Solicitar presupuesto** → `/contacto`.

**Footer** (denso, fondo negro / navy del logo, texto blanco):

- Columna Estudio: breve, enlace Sobre nosotros
- Columna Servicios: las 5 líneas
- Columna Contacto: horario, Zona Sur · Buenos Aires · Argentina, placeholders de email y WhatsApp, ícono LinkedIn (href `#` o `rel` pendiente hasta tener URL)
- Newsletter corto (email + nombre)
- Legal mínimo: © año Estudio Gemba

## 6. Identidad visual

Muy institucional y corporativo: estética de estudio técnico / documento de planta, no landing de producto digital.

- **Color:** navy casi negro del logo + blanco. Sin color de acento, sin degradados, sin blobs.
- **Tipo:** Geist (incluida en Next.js). Títulos en mayúsculas con letter-spacing amplio, como el wordmark GEMBA. Cuerpo 16–18px, interlineado holgado, medida de lectura estrecha en textos largos.
- **UI:** líneas finas, mucho aire, esquinas vivas (0 radius en botones y marcos). Separadores horizontales. Iconos outline.
- **Motion:** mínima. Hero: entrada de texto (fade/slide corto, 300–500ms). Tarjetas: hover de borde que se recorre o underline que crece; el icono no “rebota”. Sin parallax agresivo, sin partículas, sin cursor custom.
- **Imagen:** no usar stock de equipos sonrientes. Si hace falta textura: geometría, retícula, fotografía industrial en B/N de alta densidad (opcional; la v1 puede ser 100% tipográfica + líneas).
- **Logo:** archivo del cliente. Variantes: color sobre blanco (header) e invertido sobre navy (footer). No redibujar la A ni el monograma.

## 7. Contenido por página

### 7.1 Home `/`

Orden fijo:

1. **Hero a viewport:** headline “Optimización de procesos con datos de planta, no con recetas genéricas”. Subtítulo dirigido a jefes de planta y directores de operaciones de PyMEs industriales. CTA primario Solicitar presupuesto. CTA secundario (outline) Ver servicios.
2. **Franja de vocabulario técnico:** OEE · Scrap · Tiempos muertos · Disponibilidad. Son términos de trabajo, no KPIs inventados ni cifras falsas. No mostrar porcentajes de “mejora promedio” si no hay casos reales.
3. **Cinco tarjetas de servicio** (icono + título + 2 líneas + “Ver más”). Enlazan a cada subpágina.
4. **Método en 4 pasos:** Diagnóstico numérico → Plan de acción → Implementación en Gemba → Seguimiento medible.
5. **Bloque institucional corto** (3–4 oraciones) + enlace a Sobre nosotros.
6. **CTA de presupuesto** (banda full-width, fondo navy).
7. **Newsletter:** nombre, email, sector (opcional).

### 7.2 Servicios `/servicios`

Intro de una columna: el estudio no vende “mejora continua” genérica; diagnostica con números e implementa en piso. Grid de 5 tarjetas (mismas que home, copy un poco más largo). CTA al final.

### 7.3 Fichas de servicio (misma plantilla)

Cada ficha:

- Título + una frase de resultado (qué cambia en la línea)
- Para quién
- Qué se mide / qué datos se usan
- Qué se hace en planta (pasos concretos, sin jerga vacía)
- Entregable (informe, plan, tablero, rutina)
- CTA Solicitar presupuesto (query `?servicio=` con el slug, para prellenar el select del formulario)

**Diagnóstico de planta.** Baseline de OEE, scrap, paradas y pérdidas. Entregable: informe numérico y mapa de pérdidas priorizado.

**Reducción de pérdidas.** Ataque a scrap, retrabajo y cuellos de botella a partir del diagnóstico. Entregable: plan de contrapuntos y seguimiento de tasa de scrap.

**SMED / cambio rápido.** Reducción de setups para subir disponibilidad. Entregable: estándar de cambio y medición antes/después.

**TPM y 5S.** Orden, inspección básica y disciplina de piso, diseñados para la planta real (no auditoría cosmética). Entregable: rutinario 5S/TPM y tablero de adherencia.

**Implementación.** Bajar el plan a la línea, con responsables de planta y métricas de seguimiento. Entregable: hitos, indicadores y cadencia de revisión.

### 7.4 Sobre nosotros `/sobre-nosotros`

Sin nombres, fotos ni CVs. Secciones:

- Qué es Estudio Gemba (estudio técnico, no consultora de slides)
- Por qué Gemba (el problema se ve y se mide en el piso)
- Para quién (PyMEs industriales; no corporaciones con programas TPM ya maduros como único cliente)
- Dónde (Zona Sur, Buenos Aires; resto de Argentina bajo coordinación)
- Cómo trabajamos (datos duros primero; implementación después)

### 7.5 Contacto `/contacto`

Dos bloques en grid (formulario dominante a la izquierda en desktop):

- Formulario **Solicitar presupuesto**
- Columna de datos: horario 09:00–20:00, zona, email/WhatsApp cuando existan, LinkedIn, mini newsletter

Si WhatsApp y email aún no están configurados, el formulario sigue visible y envía a un estado “solicitud registrada / canal pendiente” en desarrollo; en producción el copy indica que la consulta queda registrada y se responderá por el canal elegido cuando esté activo — ver sección 9.

## 8. Componentes

| Componente | Responsabilidad |
| --- | --- |
| `SiteHeader` | Nav + CTA. Logo compacto. |
| `SiteFooter` | Columnas, newsletter corto, LinkedIn, horario. |
| `ServiceCard` | Tarjeta con hover institucional. |
| `MethodSteps` | 4 pasos numerados. |
| `BudgetForm` | Presupuesto. |
| `NewsletterForm` | Alta a newsletter. |
| `ContactConfigBanner` | Solo en desarrollo: avisa si faltan `whatsapp`/`email`. No se muestra en producción al público como “falta config”; en producción el botón WhatsApp se oculta si no hay número. |
| `PageHero` | Título de página interior + línea descriptiva. |
| `CtaBand` | Banda navy con CTA. |

Layout raíz: `html` lang=`es-AR`, header + `main` + footer.

## 9. Formularios y flujo de leads

### 9.1 Campos

**Presupuesto (obligatorios salvo indicación):**

- Empresa
- Nombre y apellido
- Cargo
- Email
- Teléfono
- Planta / localidad
- Servicio de interés (select; incluye las 5 líneas + “No estoy seguro”)
- Mensaje / necesidad
- Preferencia de respuesta: WhatsApp **o** Email (radio; default Email hasta que exista WhatsApp)

**Newsletter:**

- Nombre (obligatorio)
- Email (obligatorio)
- Sector / rubro industrial (opcional)

### 9.2 Config (`src/lib/contacto.ts`)

```ts
export const contacto = {
  email: "",          // p. ej. "hola@estudiogemba.com.ar"
  whatsapp: "",       // E.164 sin +, p. ej. "54911XXXXXXXX"
  linkedin: "",       // URL completa
  horario: "09:00 a 20:00",
  zona: "Zona Sur, Buenos Aires · Argentina",
};
```

Cadenas vacías = canal no publicado. No hardcodear números falsos en la UI.

### 9.3 Envío (Route Handler `POST /api/consulta`)

Body JSON: `{ tipo: "presupuesto" | "newsletter", ...campos }`.

Validación servidor: email RFC básica, campos requeridos según `tipo`, longitud máxima de mensaje 2000 caracteres. Rechazo 400 con errores por campo.

Orden de salida (un solo resultado por request):

1. Validar el body. Si falla: `400` con errores por campo.
2. Presupuesto + preferencia Email, o newsletter: si hay `contacto.email` y `RESEND_API_KEY`, enviar mail al estudio. Si el proveedor falla: `503` (reintentar). Si no hay mail configurado, pasar al paso 3.
3. Presupuesto + preferencia WhatsApp, o fallback si el paso 2 no aplicó: si hay `contacto.whatsapp`, responder `{ ok: true, whatsappUrl }`. El cliente abre `https://wa.me/{numero}?text=...` (resumen encodeado).
4. Si no hay ningún canal configurado: `{ ok: true, queued: true }`. UI: “Recibimos tus datos. Cuando el canal de contacto esté activo, te responderemos.” En desarrollo, log del payload en consola del servidor.

v1 no persiste leads en base de datos. Newsletter no pregunta canal: mail → WhatsApp → queued.

### 9.4 Errores de UI

- Campos inválidos: borde negro + texto de error bajo el campo. Sin toast de colores.
- Red / 5xx: “No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.”
- Éxito: reemplazo del form por un bloque de confirmación (no modal, no confetti).
- Copy prohibido: “¡Genial!”, emojis, “Awesome”.

## 10. SEO

- `metadata` por ruta: `title` plantilla `%s | Estudio Gemba`, description única.
- `openGraph` + `twitter` con logo y descripción.
- `app/sitemap.ts` y `app/robots.ts`.
- `html lang="es-AR"`.
- Un `h1` por página.
- JSON-LD `ProfessionalService`: nombre Estudio Gemba, área Buenos Aires, servicio engineering/process optimization, URL canónica `https://estudiogemba.com.ar`.
- No inventar reviews ni `aggregateRating`.
- Imágenes con `alt` descriptivo (logo: “Estudio Gemba”).

## 11. Accesibilidad (mínimo de v1)

- Contraste navy/blanco.
- Foco visible en links y campos.
- Labels asociados a inputs (no placeholder-only).
- Skip to content.
- Iconos decorativos `aria-hidden`; LinkedIn con texto “LinkedIn”.

## 12. Pruebas de aceptación (v1)

Recorrer en desktop (≥1280px) y móvil (375px):

1. Las 9 rutas renderizan y el header/footer son consistentes.
2. Cada CTA “Solicitar presupuesto” llega a `/contacto`; si hay `?servicio=` el select viene prellenado.
3. Presupuesto: vacío → errores; email mal formado → error; válido sin canales → confirmación `queued`.
4. Newsletter: igual.
5. Con `contacto.whatsapp` de prueba, el flujo abre `wa.me` con texto coherente.
6. LinkedIn sin URL: el ícono se muestra pero no promete perfil activo (href `#` + `aria-disabled` o se oculta el enlace y queda el ícono como “próximamente”; **decisión: mostrar ícono, tooltip/title “LinkedIn — próximamente”, sin URL falsa**).
7. 404: página propia, no error crudo.
8. Lighthouse (móvil): SEO ≥ 90, Accessibility ≥ 90 en home y contacto.

## 13. Fuera de alcance (v1)

Blog, CMS, autenticación, turnos, pagos, inglés, casos de éxito con métricas reales, mapa embebido, chatbots, base de datos de suscriptores, Google Analytics (se puede sumar después con un ID).

## 14. Criterio de hecho

El sitio está completo para v1 cuando: las 9 rutas existen con copy institucional, el logo está aplicado, los formularios validan y siguen el flujo de la sección 9, SEO básico está en código, y se puede cargar email/WhatsApp/LinkedIn editando solo `contacto.ts` (y env de mail si aplica) sin tocar el diseño.
