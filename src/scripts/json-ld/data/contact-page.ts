export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Fale Conosco",
  description:
    "Entre em contato com a equipe do Precific. Nossa equipe especializada está pronta para tirar suas dúvidas e agendar uma demonstração gratuita.",
  url: "https://precificapp.com#contato",
  mainEntity: {
    "@type": "Organization",
    name: "Precific",
    email: "contato@precificapp.com",
    telephone: "+552122929071",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contato@precificapp.com",
      telephone: "+552122929071",
      availableLanguage: ["Portuguese"],
      areaServed: "BR",
    },
  },
};
