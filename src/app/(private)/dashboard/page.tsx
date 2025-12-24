import ComingSoonBadge from "@/src/components/coming-soon-badge";
import { Container } from "@/src/components/core";
import Row from "@/src/components/core/row";
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
    <Container
      variant="page"
      className="max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] space-y-4 flex flex-col"
    >
      <Row className="items-center gap-4">
        <h1 className="text-3xl text-black font-bold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
    </Container>
  );
}
