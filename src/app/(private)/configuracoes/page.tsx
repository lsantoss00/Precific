import PageInConstruction from "@/src/components/page-in-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurações",
  description:
    "Configure parâmetros do sistema, preferências de cálculo, informações fiscais e outras opções para personalizar sua experiência no Precific.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsPage() {
  return <PageInConstruction />;
}
