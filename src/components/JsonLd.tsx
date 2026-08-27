export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "FIRMIND",
    url: "https://firmind.com.ar",
    logo: "https://firmind.com.ar/logo-firmind.png",
    image: "https://firmind.com.ar/logo-firmind.png",
    email: "contacto@firmind.com.ar",
    telephone: "5491127642266",
    sameAs: ["https://www.linkedin.com/company/firmind"],
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
