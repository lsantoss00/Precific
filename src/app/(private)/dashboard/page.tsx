import DashboardPageContent from "@/src/app/(private)/dashboard/components/dashboard-page-content";
import { Container } from "@/src/components/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Acompanhe suas métricas e indicadores de precificação em tempo real. Visualize dados consolidados e tome decisões estratégicas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <Container variant="page">
      <DashboardPageContent />
      <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center z-10 pointer-events-auto" />
    </Container>
  );
}
