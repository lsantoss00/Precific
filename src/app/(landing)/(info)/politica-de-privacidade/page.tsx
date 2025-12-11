import backgroundSectionImage from "@/public/landing-page/hero-section-background.webp";
import PrivacyPolicyHeader from "@/src/app/(landing)/(info)/politica-de-privacidade/components/privacy-policy-header";
import PrivacyPolicyTopics from "@/src/app/(landing)/(info)/politica-de-privacidade/components/privacy-policy-topics";
import Column from "@/src/components/core/column";
import { Metadata } from "next";
import Image from "next/image";

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
  return (
    <Column className="relative bg-primary py-16">
      <Image
        src={backgroundSectionImage}
        alt="Imagem de fundo"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="z-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25">
        <PrivacyPolicyHeader />
        <PrivacyPolicyTopics />
      </Column>
    </Column>
  );
}
