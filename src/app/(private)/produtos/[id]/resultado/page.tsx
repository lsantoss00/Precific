import ProductFormResultPageContent from "../../components/product-form-result-page-content";

export const metadata = {
  title: "Resultado",
  description:
    "Visualize os resultados detalhados da precificação do produto. Confira margens, impostos calculados e simulações tributárias.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductFormResultPage() {
  return <ProductFormResultPageContent />;
}
