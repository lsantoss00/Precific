import HeroSection from "@/src/app/(landing)/components/hero-section";
import ReasonsSection from "@/src/app/(landing)/components/reasons-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

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
  return (
    <>
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
