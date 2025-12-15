import InfoPageHeader from "@/src/app/(landing)/components/info-page-header";
import InfoPageLayout from "@/src/app/(landing)/components/info-page-layout";
import InfoPageTopics from "@/src/app/(landing)/components/info-page-topics";
import { Metadata } from "next";
import Script from "next/script";
import { termsOfUseTopics } from "./constants/terms-of-use-topics";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades ao usar nossa plataforma de precificação e gestão tributária.",
  keywords: [
    "termos de uso",
    "condições de uso",
    "termos de serviço",
    "contrato",
    "responsabilidades",
    "direitos",
    "Precific",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Precific",
    title: "Termos de Uso | Precific",
    description:
      "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades ao usar nossa plataforma.",
    url: "https://www.precificapp.com/termos-de-uso",
  },
  twitter: {
    card: "summary",
    title: "Termos de Uso | Precific",
    description:
      "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades.",
  },
  alternates: {
    canonical: "https://www.precificapp.com/termos-de-uso",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://www.precificapp.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Termos de Uso",
        item: "https://www.precificapp.com/termos-de-uso",
      },
    ],
  };

  return (
    <InfoPageLayout>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InfoPageHeader
        title="Termos de Uso"
        description="Bem-vindo ao Precific! Estes Termos de Uso estabelecem as regras e
        condições para utilização da nossa plataforma de precificação
        inteligente. <br /> Ao acessar ou utilizar nossos serviços, você
        concorda integralmente com estes termos. Leia atentamente antes de
        prosseguir."
      />
      <InfoPageTopics topics={termsOfUseTopics} />
    </InfoPageLayout>
  );
}
