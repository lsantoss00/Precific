import { Metadata } from "next";
import ProductFormPageContent from "../components/product-form-page-content";

export const metadata: Metadata = {
  title: "Precificar",
  description:
    "Precifique seu produto. Insira custos, despesas, impostos e calcule preços de venda com precisão.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductFormPage() {
  return <ProductFormPageContent />;
}
