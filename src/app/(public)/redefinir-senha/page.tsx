import RecoveryPasswordForm from "@/src/app/(public)/redefinir-senha/components/recovery-password-form";
import { Suspense } from "react";

export default function RecoveryPasswordPage() {
  return (
    <Suspense>
      <RecoveryPasswordForm />
    </Suspense>
  );
}
