import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import NewPasswordCard from "./components/new-password-card";

export default function CreateNewPasswordPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Column className="space-y-4 items-center justify-center w-full mx-2">
        <NewPasswordCard />
      </Column>
    </AuthGuard>
  );
}
