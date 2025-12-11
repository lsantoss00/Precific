import LoginForm from "@/src/app/(public)/entrar/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
  keywords: ["login", "entrar", "acessar conta", "área do cliente", "Precific"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Precific",
    title: "Entrar | Precific",
    description:
      "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
    url: "https://www.precificapp.com/entrar",
  },
  twitter: {
    card: "summary",
    title: "Entrar | Precific",
    description:
      "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente.",
  },
  alternates: {
    canonical: "https://www.precificapp.com/entrar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
