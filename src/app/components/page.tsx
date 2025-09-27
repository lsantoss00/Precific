import ComponentsDemonstration from "@/src/components/components-demonstration";
import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";

export default function ComponentsPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <Column className="w-full justify-center items-center space-y-4">
        <ComponentsDemonstration />
      </Column>
    </AuthGuard>
  );
}
