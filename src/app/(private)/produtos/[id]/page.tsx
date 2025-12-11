import { Metadata } from "next";
import ProductFormPageContent from "../components/product-form-page-content";

export const metadata: Metadata = {
  title: "Formulário de Produto",
  description:
    "Cadastre ou edite informações de produtos. Insira custos, despesas, impostos e calcule preços de venda com precisão.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductFormPage() {
  return <ProductFormPageContent />;
}
