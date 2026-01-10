export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre Nós",
  description:
    "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato. Nossa missão é simplificar a gestão financeira e tributária das empresas brasileiras.",
  url: "https://precificapp.com/sobre-nos",
  mainEntity: {
    "@type": "Organization",
    name: "Grupo Viriato",
    description:
      "Há mais de 40 anos impulsionando empresas, o Grupo Viriato reúne soluções em contabilidade, consultoria tributária, jurídico, seguros e gestão empresarial.",
    foundingDate: "1980",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 200,
    },
    knowsAbout: [
      "Contabilidade",
      "Consultoria Tributária",
      "Precificação",
      "Gestão Empresarial",
      "Reforma Tributária",
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://precificapp.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sobre Nós",
        item: "https://precificapp.com/sobre-nos",
      },
    ],
  },
};
