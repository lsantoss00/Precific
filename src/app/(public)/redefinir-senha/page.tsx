import RecoveryPasswordForm from "@/src/app/(public)/redefinir-senha/components/recovery-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Redefinir Senha | Precific",
};

export default function RecoveryPasswordPage() {
  return (
    <Suspense>
      <RecoveryPasswordForm />
    </Suspense>
  );
}
