import { Metadata } from "next";
import ProductFormPageContent from "../components/product-form-page-content";

export const metadata: Metadata = {
  title: "Formulário de Produto",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductFormPage() {
  return <ProductFormPageContent />;
}
