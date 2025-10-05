import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import NewProductResult from "../components/new-product-result";

export default function NewProductResultPage() {
  return (
    <AuthGuard requireAuth>
      <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-3">
        <h2 className="text-3xl text-black font-bold">Resultado</h2>
        <NewProductResult />
      </Column>
    </AuthGuard>
  );
}
