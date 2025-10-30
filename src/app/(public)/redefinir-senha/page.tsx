import RecoveryPasswordForm from "@/src/app/(public)/redefinir-senha/components/recovery-password-form";
import Column from "@/src/components/core/column";

export default function RecoveryPasswordPage() {
  return (
    <Column className="space-y-4 items-center justify-center w-full mx-2">
      <RecoveryPasswordForm />
    </Column>
  );
}
