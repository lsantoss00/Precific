import RecoveryPasswordForm from "@/src/app/(public)/redefinir-senha/components/recovery-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Redefinir Senha",
  description:
    "Esqueceu sua senha? Redefina sua senha de acesso ao Precific de forma rápida e segura.",
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
