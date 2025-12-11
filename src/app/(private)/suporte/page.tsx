import PageInConstruction from "@/src/components/page-in-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Central de ajuda e suporte do Precific. Tire suas dúvidas, acesse tutoriais e entre em contato com nossa equipe de atendimento.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupportPage() {
  return <PageInConstruction />;
}
