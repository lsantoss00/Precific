"use client";

import AuthGuard from "@/src/components/core/auth-guard";
import ProductFormResultPageContent from "../../components/product-form-result-page-content";

export default function ProductFormResultPage() {
  return (
    <AuthGuard requireAuth>
      <ProductFormResultPageContent />
    </AuthGuard>
  );
}
