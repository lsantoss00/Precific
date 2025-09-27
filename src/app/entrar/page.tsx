import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <Column className="w-full justify-center items-center">
        <h1 className="text-2xl font-bold">Precific Public Page</h1>
      </Column>
    </AuthGuard>
  );
}
