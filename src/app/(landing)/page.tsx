import LandingPageContent from "@/src/app/(landing)/components/landing-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Precific | Sistema de Precificação e Gestão Tributária",
  },
  description:
    "Simplifique a precificação dos seus produtos com a Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança. Automatize cálculos de custos, impostos e simule a Reforma Tributária (IBS/CBS).",
  openGraph: {
    title: "Precific - Sistema de Precificação e Gestão Tributária",
    description:
      "Simplifique a precificação dos seus produtos com a Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança.",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Precific - Sistema de Precificação e Gestão Tributária",
      },
    ],
  },
  twitter: {
    title: "Precific - Sistema de Precificação e Gestão Tributária",
    description:
      "Simplifique a precificação dos seus produtos com a Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança.",
  },
  alternates: {
    canonical: "https://www.precificapp.com",
  },
};

export default function LandingPage() {
  return <LandingPageContent />;
}
