import ContactSection from "@/src/app/(public)/inicio/components/contact-section";
import FAQSection from "@/src/app/(public)/inicio/components/faq-section";
import Footer from "@/src/app/(public)/inicio/components/footer";
import GetAheadSection from "@/src/app/(public)/inicio/components/get-ahead-section";
import HeroSection from "@/src/app/(public)/inicio/components/hero-section";
import LogoSection from "@/src/app/(public)/inicio/components/logo-section";
import ReasonsSection from "@/src/app/(public)/inicio/components/reasons-section";
import StartUsingSection from "@/src/app/(public)/inicio/components/start-using-section";
import ValuePropositionSection from "@/src/app/(public)/inicio/components/value-proposition-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precific",
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
