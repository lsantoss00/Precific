import LoginForm from "@/src/app/(public)/entrar/components/login-form";
import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
  keywords: ["login", "entrar", "acessar conta", "área do cliente", "precific"],
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
    canonical: "/entrar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <Column className="items-center justify-center h-screen w-screen px-2">
      <LoginForm />
      <Link href="/" className="flex self-center w-fit my-2" passHref>
        <Button type="button" variant="link" className="text-xs sm:text-sm">
          Caiu de paraquedas? Conheça a Precific!
        </Button>
      </Link>
    </Column>
  );
}
