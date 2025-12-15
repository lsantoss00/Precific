export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Precific",
  legalName: "Grupo Viriato",
  url: "https://www.precificapp.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.precificapp.com/opengraph-image.webp",
    width: 1200,
    height: 630,
  },
  description:
    "Sistema completo de precificação e gestão tributária para empresas.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Suporte",
      email: "contato@precificapp.com",
      telephone: "+552122929071",
      availableLanguage: ["Portuguese", "pt-BR"],
      areaServed: "BR",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/grupo-viriato/",
    "https://www.instagram.com/grupoviriato",
    "https://www.youtube.com/@ViriatoCast",
  ],
  foundingDate: "1980",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
};

