import { canalesDisponibles, contacto } from "@/lib/contacto";

const MENSAJE =
  "Hola, quiero hacer una consulta a Estudio Gemba.";

export function WhatsAppButton() {
  const canales = canalesDisponibles(contacto);
  const className =
    "inline-flex items-center justify-center border border-navy px-6 py-3 text-sm uppercase tracking-[0.14em]";

  if (!canales.whatsapp) {
    return (
      <span className={`${className} cursor-not-allowed opacity-50`} title="WhatsApp — próximamente">
        WhatsApp
      </span>
    );
  }

  const href = `https://wa.me/${contacto.whatsapp.trim()}?text=${encodeURIComponent(MENSAJE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      WhatsApp
    </a>
  );
}
