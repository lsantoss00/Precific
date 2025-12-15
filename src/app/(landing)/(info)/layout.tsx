import { BreadcrumbScript } from "@/src/scripts/json-ld";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbScript />
      {children}
    </>
  );
}
