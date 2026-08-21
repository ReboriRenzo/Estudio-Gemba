export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "FIRMIND",
    url: "https://firmind.com.ar",
    email: "contacto@firmind.com.ar",
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
