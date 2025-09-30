import AuthGuard from "@/src/components/core/auth-guard";
import Products from "./components/products";

export default function ProductsPage() {
  return (
    <AuthGuard requireAuth>
      <Products />
    </AuthGuard>
  );
}
