import InfoPageHeader from "@/src/app/(landing)/components/info-page-header";
import InfoPageLayout from "@/src/app/(landing)/components/info-page-layout";
import InfoPageTopics from "@/src/app/(landing)/components/info-page-topics";
import { Metadata } from "next";
import Script from "next/script";
import { privacyPolicyTopics } from "./constants/privacy-policy-topics";

export const metadata: Metadata = {
  title: "Política de Privacidade | Precific",
  description:
    "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais. Transparência e segurança no tratamento de informações no Precific.",
  keywords: [
    "política de privacidade",
    "LGPD",
    "proteção de dados",
    "privacidade",
    "dados pessoais",
    "segurança da informação",
    "Precific",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Precific",
    title: "Política de Privacidade | Precific",
    description:
      "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais. Transparência e segurança no tratamento de informações.",
    url: "https://www.precificapp.com/politica-de-privacidade",
  },
  twitter: {
    card: "summary",
    title: "Política de Privacidade | Precific",
    description:
      "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais.",
  },
  alternates: {
    canonical: "https://www.precificapp.com/politica-de-privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
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
        name: "Política de Privacidade",
        item: "https://www.precificapp.com/politica-de-privacidade",
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
        title="Política de Privacidade"
        description="Esta Política de Privacidade descreve como a Precific coleta, usa,
        armazena e protege as informações pessoais dos usuários da nossa
        plataforma de precificação. <br /> É importante ler atentamente esta
        política antes de utilizar nossos serviços ou fornecer quaisquer
        informações pessoais."
      />
      <InfoPageTopics topics={privacyPolicyTopics} />
    </InfoPageLayout>
  );
}
