import AuthGuard from "../components/core/auth-guard";
import Column from "../components/core/column";

export default function Home() {
  return (
    <AuthGuard requireAuth>
      <Column className="w-full justify-center items-center">
        <h1 className="text-2xl font-bold">Precific Private Page</h1>
      </Column>
    </AuthGuard>
  );
}
