import PageInConstruction from "@/src/components/page-in-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suporte",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupportPage() {
  return <PageInConstruction />;
}
