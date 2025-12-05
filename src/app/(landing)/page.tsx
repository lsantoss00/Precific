import HeroSection from "@/src/app/(landing)/components/hero-section";
import ReasonsSection from "@/src/app/(landing)/components/reasons-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const GetAheadSection = dynamic(
  () => import("@/src/app/(landing)/components/get-ahead-section"),
  { ssr: false }
);
const ValuePropositionSection = dynamic(
  () => import("@/src/app/(landing)/components/value-proposition-section"),
  { ssr: false }
);
const LogoSection = dynamic(
  () => import("@/src/app/(landing)/components/logo-section"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/src/app/(landing)/components/contact-section"),
  { ssr: false }
);
const StartUsingSection = dynamic(
  () => import("@/src/app/(landing)/components/start-using-section"),
  { ssr: false }
);
const FAQSection = dynamic(
  () => import("@/src/app/(landing)/components/faq-section"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/src/app/(landing)/components/footer"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Precific",
  description:
    "O Precific é um produto oficial do Grupo Viriato, desenvolvido para apoiar empresas na formação de preços com precisão, inteligência tributária e eficiência operacional.",
  openGraph: {
    title: "Precific",
    description:
      "Automatize o cálculo de preços com base em custos, impostos e margens. Simule cenários futuros da Reforma Tributária.",
    type: "website",
    locale: "pt_BR",
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
