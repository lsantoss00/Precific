import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import RecoveryPasswordCard from "./components/recovery-password-card";

export default function RecoveryPasswordPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <Column className="space-y-4 items-center justify-center w-full mx-2">
        <RecoveryPasswordCard />
      </Column>
    </AuthGuard>
  );
}
