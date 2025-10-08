import AuthGuard from "@/src/components/core/auth-guard";
import ProductFormPageContent from "../components/product-form-page-content";

export default function ProductFormPage() {
  return (
    <AuthGuard requireAuth>
      <ProductFormPageContent />
    </AuthGuard>
  );
}
