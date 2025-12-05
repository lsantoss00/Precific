import PageInConstruction from "@/src/components/page-in-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurações",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsPage() {
  return <PageInConstruction />;
}
