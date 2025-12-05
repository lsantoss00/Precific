import LoginForm from "@/src/app/(public)/entrar/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
  openGraph: {
    title: "Entrar - Precific",
    description:
      "Acesse sua conta e gerencie a precificação dos seus produtos.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.precificapp.com/entrar",
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
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
