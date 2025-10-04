import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Produto | Precific",
};

export default function NewProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
