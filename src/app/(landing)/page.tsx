import HeroSection from "@/src/app/(landing)/components/hero-section";
import ReasonsSection from "@/src/app/(landing)/components/reasons-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

const GetAheadSection = dynamic(
  () => import("@/src/app/(landing)/components/get-ahead-section")
);
const ValuePropositionSection = dynamic(
  () => import("@/src/app/(landing)/components/value-proposition-section")
);
const LogoSection = dynamic(
  () => import("@/src/app/(landing)/components/logo-section")
);
const ContactSection = dynamic(
  () => import("@/src/app/(landing)/components/contact-section")
);
const StartUsingSection = dynamic(
  () => import("@/src/app/(landing)/components/start-using-section")
);
const FAQSection = dynamic(
  () => import("@/src/app/(landing)/components/faq-section")
);
const Footer = dynamic(() => import("@/src/app/(landing)/components/footer"));

export const metadata: Metadata = {
  title: {
    absolute: "Precific",
  },
  description:
    "Automatize a precificação de produtos com precisão. Sistema completo para cálculo de custos, impostos, margens e simulação da Reforma Tributária. Inteligência tributária para empresas.",
  keywords: [
    "precificação",
    "formação de preços",
    "cálculo de impostos",
    "reforma tributária",
    "gestão de custos",
    "margem de lucro",
    "precificação automática",
    "sistema de precificação",
    "tributação empresarial",
    "IBS",
    "CBS",
  ],
  alternates: {
    canonical: "https://www.precificapp.com",
  },
  openGraph: {
    title: "Precific",
    description:
      "Automatize o cálculo de preços com base em custos, impostos e margens. Simule cenários futuros da Reforma Tributária e tome decisões estratégicas.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.precificapp.com",
    siteName: "Precific",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Precific",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precific - Sistema Inteligente de Precificação",
    description:
      "Automatize a precificação de produtos com inteligência tributária. Simule a Reforma Tributária e otimize suas margens.",
    images: ["/opengraph-image.webp"],
  },
};

export default function LandingPage() {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Precific",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    description:
      "Sistema completo de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária.",
    url: "https://www.precificapp.com",
    provider: {
      "@type": "Organization",
      name: "Grupo Viriato",
      url: "https://www.viriato.com.br/",
    },
    featureList: [
      "Cálculo automático de preços",
      "Gestão de impostos",
      "Simulação da Reforma Tributária",
      "Controle de margens",
      "Análise de custos",
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Precific",
    legalName: "Grupo Viriato",
    url: "https://www.precificapp.com",
    logo: "https://www.precificapp.com/opengraph-image.webp",
    description:
      "Sistema completo de precificação e gestão tributária para empresas.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Suporte",
      availableLanguage: "Portuguese",
    },
    sameAs: [],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como eu posso adquirir o sistema?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Você pode contratar o Precific entrando em contato com nossa equipe comercial. Fazemos a implantação e deixamos tudo pronto para começar a precificar de forma estratégica desde o primeiro dia.",
        },
      },
      {
        "@type": "Question",
        name: "Qual o valor do investimento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabalhamos com planos, solicite uma proposta personalizada para sua operação.",
        },
      },
      {
        "@type": "Question",
        name: "Meus dados estão seguros?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Todos os dados são armazenados em servidores protegidos, com criptografia e protocolos de segurança que seguem padrões internacionais. Nenhuma informação é compartilhada e você mantém total controle sobre tudo o que é enviado para a plataforma.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona o suporte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nosso suporte acompanha você desde a implantação. Ajudamos na configuração inicial, tiramos dúvidas sobre uso do sistema e orientamos nas melhores práticas de formação de preço. O atendimento é contínuo e realizado por especialistas em precificação e tributação.",
        },
      },
      {
        "@type": "Question",
        name: "Quais são os principais benefícios do Precific?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O Precific reduz erros de cálculo, padroniza sua precificação, aumenta a margem de lucro e acelera a tomada de decisão. Você visualiza custos, despesas, tributos e margem real em poucos segundos, com clareza total sobre o impacto financeiro de cada produto.",
        },
      },
      {
        "@type": "Question",
        name: "O sistema já está preparado para a Reforma Tributária?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. O Precific considera as novas estruturas de IBS e CBS e permite simular diferentes cenários de impacto tributário. Assim, você consegue ajustar preços e margens antecipadamente, evitando surpresas quando as novas regras entrarem em vigor.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="software-app-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <ReasonsSection />
      <GetAheadSection />
      <ValuePropositionSection />
      <LogoSection />
      <ContactSection />
      <StartUsingSection />
      <FAQSection />
      <Footer />
    </>
  );
}
