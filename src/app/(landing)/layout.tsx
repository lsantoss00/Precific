import Footer from "@/src/app/(landing)/components/footer";
import Header from "@/src/app/(landing)/components/header";
import Column from "@/src/components/core/column";
import Script from "next/script";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column className="w-full min-h-screen">
      <Script
        id="software-app-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Script
        id="contact-page-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </Column>
  );
}

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
  logo: {
    "@type": "ImageObject",
    url: "https://www.precificapp.com/opengraph-image.webp",
    width: 1200,
    height: 630,
  },
  description:
    "Sistema completo de precificação e gestão tributária para empresas.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Suporte",
      email: "contato@precificapp.com",
      telephone: "+552122929071",
      availableLanguage: ["Portuguese", "pt-BR"],
      areaServed: "BR",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/grupo-viriato/",
    "https://www.instagram.com/grupoviriato",
    "https://www.youtube.com/@ViriatoCast",
  ],
  foundingDate: "1980",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
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

const websiteJsonLd = {
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

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Fale Conosco | Precific",
  description:
    "Entre em contato com a equipe do Precific. Nossa equipe especializada está pronta para tirar suas dúvidas e agendar uma demonstração gratuita.",
  url: "https://www.precificapp.com#contato",
  mainEntity: {
    "@type": "Organization",
    name: "Precific",
    email: "contato@precificapp.com",
    telephone: "+552122929071",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Atendimento ao Cliente",
      email: "contato@precificapp.com",
      telephone: "+552122929071",
      availableLanguage: ["Portuguese", "pt-BR"],
      areaServed: "BR",
    },
  },
};
