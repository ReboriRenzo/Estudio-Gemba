export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Estudio Gemba",
    url: "https://estudiogemba.com.ar",
    areaServed: { "@type": "AdministrativeArea", name: "Buenos Aires" },
    serviceType: "Ingeniería y optimización de procesos industriales",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
