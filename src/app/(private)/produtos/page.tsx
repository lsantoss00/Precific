import ProductsPageContent from "@/src/app/(private)/produtos/components/products-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Gerencie seus produtos, realize cálculos de precificação, impostos e margens. Simule cenários da Reforma Tributária e otimize seus preços.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
