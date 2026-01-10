import Footer from "@/src/app/(landing)/components/footer";
import Header from "@/src/app/(landing)/components/header";
import Column from "@/src/components/core/column";
import { GlobalLandingScripts } from "@/src/scripts/json-ld";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column className="w-full min-h-screen">
      <GlobalLandingScripts />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </Column>
  );
}
