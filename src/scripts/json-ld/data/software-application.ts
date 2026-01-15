export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://precificapp.com/#software",
  name: "Precific",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  isAccessibleForFree: true,
  offers: [
    {
      "@type": "Offer",
      name: "Plano Gratuito",
      price: "0",
      priceCurrency: "BRL",
    },
    // {
    //   "@type": "Offer",
    //   name: "Plano Pago",
    //   price: "29.90",
    //   priceCurrency: "BRL",
    // },
  ],
  publisher: {
    "@id": "https://precificapp.com/#organization",
  },
  description:
    "Aplicativo de precificação que automatiza cálculos de preços e simula cenários da Reforma Tributária.",
};
