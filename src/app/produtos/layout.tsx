import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | Precific",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
