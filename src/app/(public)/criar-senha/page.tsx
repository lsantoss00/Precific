import PasswordForm from "@/src/app/(public)/criar-senha/components/password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Senha",
  description:
    "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação e gestão tributária.",
  openGraph: {
    type: "website",
    locale: "pt-BR",
    siteName: "Precific",
    title: "Criar Senha | Precific",
    description:
      "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação e gestão tributária.",
  },
  twitter: {
    card: "summary",
    title: "Criar Senha | Precific",
    description:
      "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateNewPasswordPage() {
  return <PasswordForm />;
}
