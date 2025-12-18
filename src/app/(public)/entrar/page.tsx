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
    url: "https://precificapp.com/entrar",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Entrar | Precific",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrar | Precific",
    description:
      "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente.",
    images: ["/opengraph-image.webp"],
  },
  alternates: {
    canonical: "https://precificapp.com/entrar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
