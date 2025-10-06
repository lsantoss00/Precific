import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X | Precific",
};

export default function ProductFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
