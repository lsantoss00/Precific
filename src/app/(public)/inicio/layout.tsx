import Header from "@/src/app/(public)/inicio/components/header";
import Column from "@/src/components/core/column";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column className="w-full min-h-screen">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
    </Column>
  );
}
