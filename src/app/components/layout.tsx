import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precific | Shadcn Components",
};

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
