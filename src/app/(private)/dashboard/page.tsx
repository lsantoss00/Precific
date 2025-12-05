import PageInConstruction from "@/src/components/page-in-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <PageInConstruction />;
}
