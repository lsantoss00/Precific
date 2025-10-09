import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Nova Senha | Precific",
};

export default function CreateNewPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
