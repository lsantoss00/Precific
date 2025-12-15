export const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Precific",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Financial Software",
  operatingSystem: "Web Browser",
  availableOnDevice: ["Desktop", "Mobile", "Tablet"],
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    priceValidUntil: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
      .toISOString()
      .split("T")[0],
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Grupo Viriato",
    },
  },
  description:
    "Sistema completo de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS) e otimize seus preços com precisão.",
  url: "https://www.precificapp.com",
  downloadUrl: "https://www.precificapp.com/entrar",
  softwareVersion: "1.0",
  releaseNotes: "Versão inicial do sistema de precificação Precific.",
  screenshot: "https://www.precificapp.com/opengraph-image.webp",
  provider: {
    "@type": "Organization",
    name: "Grupo Viriato",
    url: "https://www.viriato.com.br/",
  },
  creator: {
    "@type": "Organization",
    name: "Grupo Viriato",
    url: "https://www.viriato.com.br/",
  },
  featureList: [
    "Cálculo automático de preços de venda",
    "Gestão completa de impostos e tributos",
    "Simulação da Reforma Tributária (IBS e CBS)",
    "Controle de margens de lucro",
    "Análise detalhada de custos",
    "Importação de produtos via planilha",
    "Relatórios gerenciais",
    "Interface intuitiva e moderna",
  ],
  keywords: [
    "precificação",
    "gestão tributária",
    "reforma tributária",
    "IBS",
    "CBS",
    "cálculo de preços",
    "margem de lucro",
  ],
  inLanguage: "pt-BR",
  isAccessibleForFree: false,
};

