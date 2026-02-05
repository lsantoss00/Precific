import AboutUsHeroSection from "@/src/app/(landing)/(info)/sobre-nos/components/about-us-hero-section";
import CompanyMissionAndValuesSection from "@/src/app/(landing)/(info)/sobre-nos/components/company-mission-and-values-section";
import CompanyMissionStatementSection from "@/src/app/(landing)/(info)/sobre-nos/components/company-mission-statement-section";
import OurCompaniesSection from "@/src/app/(landing)/(info)/sobre-nos/components/our-companies-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato. Nossa missão é simplificar a gestão financeira e tributária das empresas brasileiras.",
  keywords: [
    "sobre nós",
    "precific",
    "grupo viriato",
    "empresa",
    "missão",
    "visão",
    "valores",
    "história",
    "gestão tributária",
    "precificação",
  ],
  openGraph: {
    title: "Sobre Nós | Precific",
    description:
      "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato. Nossa missão é simplificar a gestão financeira e tributária das empresas brasileiras.",
    url: "https://precificapp.com/sobre-nos",
  },
  twitter: {
    title: "Sobre Nós | Precific",
    description:
      "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato.",
  },
  alternates: {
    canonical: "/sobre-nos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutUsHeroSection />
      <CompanyMissionStatementSection />
      <OurCompaniesSection />
      <CompanyMissionAndValuesSection />
    </>
  );
}
