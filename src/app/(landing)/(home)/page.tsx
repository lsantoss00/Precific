import LandingPageContent from "@/src/app/(landing)/components/landing-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Precific",
  },
  description:
    "Simplifique a precificação dos seus produtos com o Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança. Automatize cálculos de custos, impostos e simule a Reforma Tributária (IBS/CBS).",
  openGraph: {
    type: "website",
    locale: "pt-BR",
    siteName: "Precific",
    title: "Precific",
    description:
      "Simplifique a precificação dos seus produtos com o Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança.",
    url: "https://precificapp.com",
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
    title: "Precific",
    description:
      "Simplifique a precificação dos seus produtos com o Precific. Calcule preços de forma rápida e precisa, otimize suas margens e tome decisões estratégicas com confiança.",
    images: ["/opengraph-image.webp"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return <LandingPageContent />;
}
