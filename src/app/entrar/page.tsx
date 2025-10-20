import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import LoginCard from "./components/login-card";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <Column className="w-full items-center justify-center">
        <LoginCard />
      </Column>
    </AuthGuard>
  );
}
