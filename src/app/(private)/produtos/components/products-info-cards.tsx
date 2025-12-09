"use client";

import pluralize from "@/src/helpers/pluralize";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Package, Tag, XCircle } from "lucide-react";
import { getProductSummaries } from "../services/get-summary-products";
import InfoCard from "./info-card";

const ProductInfoCards = () => {
  const { data: summary, isPending: pendingProductSummaries } = useQuery({
    queryFn: getProductSummaries,
    queryKey: ["product-summaries"],
  });

  const infoCards = [
    {
      id: 1,
      title: pluralize(
        summary?.registered_products || 0,
        "Produto Cadastrado",
        "Produtos Cadastrados"
      ),
      value: summary?.registered_products || 0,
      icon: (
        <Package className="w-16 h-16 p-4 text-[#66219B] bg-[#66218B]/20 rounded-full" />
      ),
    },
    {
      id: 2,
      title: pluralize(
        summary?.precified_products || 0,
        "Produto Precificado",
        "Produtos Precificados"
      ),
      value: summary?.precified_products || 0,
      icon: (
        <Tag className="w-16 h-16 p-4 text-secondary bg-secondary/20 rounded-full" />
      ),
    },
    {
      id: 3,
      title: pluralize(
        summary?.active_products || 0,
        "Produto Ativo",
        "Produtos Ativos"
      ),
      value: summary?.active_products || 0,
      icon: (
        <CheckCircle className="w-16 h-16 p-4 text-green-600 bg-green-100 rounded-full" />
      ),
    },
    {
      id: 4,
      title: pluralize(
        summary?.inactive_products || 0,
        "Produto Inativo",
        "Produtos Inativos"
      ),
      value: summary?.inactive_products || 0,
      icon: (
        <XCircle className="w-16 h-16 p-4 text-red-600 bg-red-100 rounded-full" />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-4">
      {infoCards.map((card) => (
        <InfoCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
          pending={pendingProductSummaries}
        />
      ))}
    </div>
  );
};

export default ProductInfoCards;
