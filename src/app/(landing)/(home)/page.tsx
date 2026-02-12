import HeroSection from "@/src/app/(landing)/components/hero-section";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Precific | Plataforma de Precificação Inteligente",
  },
};

const ReasonsSection = dynamic(
  () => import("@/src/app/(landing)/components/reasons-section"),
  { ssr: true },
);

const GetAheadSection = dynamic(
  () => import("@/src/app/(landing)/components/get-ahead-section"),
  { ssr: true },
);

const ValuePropositionSection = dynamic(
  () => import("@/src/app/(landing)/components/value-proposition-section"),
  { ssr: true },
);

const LogoSection = dynamic(
  () => import("@/src/app/(landing)/components/logo-section"),
  { ssr: true },
);

const ContactSection = dynamic(
  () => import("@/src/app/(landing)/components/contact-section"),
  { ssr: true },
);

const StartUsingSection = dynamic(
  () => import("@/src/app/(landing)/components/start-using-section"),
  { ssr: true },
);

const FAQSection = dynamic(
  () => import("@/src/app/(landing)/components/faq-section"),
  { ssr: true },
);

export default function HomePage() {
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
