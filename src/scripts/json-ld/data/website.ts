export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Precific",
  url: "https://www.precificapp.com",
  description:
    "Sistema de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS) e otimize seus preços.",
  publisher: {
    "@type": "Organization",
    name: "Grupo Viriato",
    url: "https://www.viriato.com.br/",
  },
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.precificapp.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

