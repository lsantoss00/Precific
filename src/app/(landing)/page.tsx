import GetAheadSection from "@/src/app/(landing)/components/get-ahead-section";
import HeroSection from "@/src/app/(landing)/components/hero-section";
import LogoSection from "@/src/app/(landing)/components/logo-section";
import ReasonsSection from "@/src/app/(landing)/components/reasons-section";
import StartUsingSection from "@/src/app/(landing)/components/start-using-section";
import ValuePropositionSection from "@/src/app/(landing)/components/value-proposition-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactSection = dynamic(
  () => import("@/src/app/(landing)/components/contact-section"),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import("@/src/app/(landing)/components/faq-section"),
  { ssr: true }
);

export const metadata: Metadata = {
  title: {
    absolute:
      "Precific - Sistema Inteligente de Precificação e Gestão Tributária",
  },
  description:
    "Automatize a precificação de produtos com precisão. Sistema completo para cálculo de custos, impostos, margens e simulação da Reforma Tributária. Inteligência tributária para empresas.",
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
    </>
  );
}
