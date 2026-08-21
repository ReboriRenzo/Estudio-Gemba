export type ContactoConfig = {
  email: string;
  emailBoletin: string;
  whatsapp: string;
  linkedin: string;
  horario: string;
  zona: string;
};

export const contacto: ContactoConfig = {
  email: "contacto@firmind.com.ar",
  emailBoletin: "industria@firmind.com.ar",
  whatsapp: "5491127642266",
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
