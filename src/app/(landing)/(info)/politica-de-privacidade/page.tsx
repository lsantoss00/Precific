import InfoPageHeader from "@/src/app/(landing)/components/info-page-header";
import InfoPageLayout from "@/src/app/(landing)/components/info-page-layout";
import InfoPageTopics from "@/src/app/(landing)/components/info-page-topics";
import { Metadata } from "next";
import { privacyPolicyTopics } from "./constants/privacy-policy-topics";

export const metadata: Metadata = {
  title: "Política de Privacidade",
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
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Política de Privacidade | Precific",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade | Precific",
    description:
      "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais.",
    images: ["/opengraph-image.webp"],
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
  return (
    <InfoPageLayout>
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
