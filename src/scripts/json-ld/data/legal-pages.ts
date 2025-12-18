export const termsOfUseJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Termos de Uso",
  description:
    "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades ao usar nossa plataforma de precificação e gestão tributária.",
  url: "https://precificapp.com/termos-de-uso",
  inLanguage: "pt-BR",
  isPartOf: {
    "@type": "WebSite",
    name: "Precific",
    url: "https://precificapp.com",
  },
  about: {
    "@type": "Thing",
    name: "Termos de Serviço",
    description: "Condições legais de uso da plataforma Precific",
  },
  mainContentOfPage: {
    "@type": "WebPageElement",
    cssSelector: "main",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "p"],
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
        name: "Termos de Uso",
        item: "https://precificapp.com/termos-de-uso",
      },
    ],
  },
  lastReviewed: new Date().toISOString().split("T")[0],
};

export const privacyPolicyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Política de Privacidade",
  description:
    "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais. Transparência e segurança no tratamento de informações no Precific.",
  url: "https://precificapp.com/politica-de-privacidade",
  inLanguage: "pt-BR",
  isPartOf: {
    "@type": "WebSite",
    name: "Precific",
    url: "https://precificapp.com",
  },
  about: {
    "@type": "Thing",
    name: "Política de Privacidade",
    description:
      "Práticas de coleta, uso e proteção de dados pessoais conforme LGPD",
  },
  mentions: {
    "@type": "Legislation",
    name: "Lei Geral de Proteção de Dados (LGPD)",
    legislationIdentifier: "Lei nº 13.709/2018",
    legislationJurisdiction: "Brasil",
  },
  mainContentOfPage: {
    "@type": "WebPageElement",
    cssSelector: "main",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "p"],
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
        name: "Política de Privacidade",
        item: "https://precificapp.com/politica-de-privacidade",
      },
    ],
  },
  lastReviewed: new Date().toISOString().split("T")[0],
};
