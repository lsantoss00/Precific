import RecoveryPasswordForm from "@/src/app/(public)/redefinir-senha/components/recovery-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Redefinir Senha",
  description:
    "Esqueceu sua senha? Redefina sua senha de acesso ao Precific de forma rápida e segura.",
  openGraph: {
    title: "Redefinir Senha - Precific",
    description: "Recupere o acesso à sua conta Precific.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.precificapp.com/redefinir-senha",
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

export default function RecoveryPasswordPage() {
  return (
    <Suspense>
      <RecoveryPasswordForm />
    </Suspense>
  );
}
