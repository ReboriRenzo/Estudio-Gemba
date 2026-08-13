import { canalesDisponibles, contacto } from "@/lib/contacto";

export function ContactConfigBanner() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const canales = canalesDisponibles(contacto);
  if (canales.email || canales.whatsapp) {
    return null;
  }

  return (
    <div
      role="status"
      className="border-b border-navy/15 bg-paper px-4 py-2 text-center text-sm text-navy"
    >
      Canales de contacto aún no configurados (src/lib/contacto.ts).
    </div>
  );
}
