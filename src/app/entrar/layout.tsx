import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | Precific",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
