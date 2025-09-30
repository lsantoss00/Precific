import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir Senha | Precific",
};

export default function RecoveryPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
