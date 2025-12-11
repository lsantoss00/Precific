import LandingPageContent from "@/src/app/(landing)/components/landing-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Precific",
  },
  description:
    "Simplifique a precificação dos seus produtos com a Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança.",
};

export default function LandingPage() {
  return <LandingPageContent />;
}
