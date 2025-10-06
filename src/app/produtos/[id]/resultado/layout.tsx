import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultado | Precific",
};

export default function ProductFormResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
