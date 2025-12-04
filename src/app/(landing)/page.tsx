import ContactSection from "@/src/app/(landing)/components/contact-section";
import FAQSection from "@/src/app/(landing)/components/faq-section";
import Footer from "@/src/app/(landing)/components/footer";
import GetAheadSection from "@/src/app/(landing)/components/get-ahead-section";
import HeroSection from "@/src/app/(landing)/components/hero-section";
import LogoSection from "@/src/app/(landing)/components/logo-section";
import ReasonsSection from "@/src/app/(landing)/components/reasons-section";
import StartUsingSection from "@/src/app/(landing)/components/start-using-section";
import ValuePropositionSection from "@/src/app/(landing)/components/value-proposition-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precific",
  description:
    "O Precific é um produto oficial do Grupo Viriato, desenvolvido para apoiar empresas na formação de preços com precisão, inteligência tributária e eficiência operacional. ",
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
