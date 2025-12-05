import PasswordForm from "@/src/app/(public)/criar-senha/components/password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Senha",
  description:
    "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação e gestão tributária.",
  openGraph: {
    title: "Criar Senha  Precific",
    description: "Configure sua senha e finalize o cadastro na plataforma.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.precificapp.com/criar-senha",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Precific",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateNewPasswordPage() {
  return <PasswordForm />;
}
