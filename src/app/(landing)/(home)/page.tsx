import LandingPageContent from "@/src/app/(landing)/components/landing-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Precific | Plataforma de Precificação Inteligente",
  },
};

export default function HomePage() {
  return <LandingPageContent />;
}
