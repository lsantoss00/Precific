"use client";

import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Package, Tag, XCircle } from "lucide-react";
import { getProductSummaries } from "../services/get-summary-products";
import InfoCard from "./info-card";
import InfoCardSkeleton from "./skeletons/info-card-skeleton";

const ProductInfoCards = () => {
  const { data: summary, isPending: pendingProductSummaries } = useQuery({
    queryFn: getProductSummaries,
    queryKey: ["product-summaries"],
    refetchInterval: 60000,
  });

  const infoCards = [
    {
      id: 1,
      title: "Produtos Cadastrados",
      value: summary?.registered_products || 0,
      icon: <Package className="w-10 h-10 text-[#66289B]" />,
    },
    {
      id: 2,
      title: "Produtos Precificados",
      value: summary?.precified_products || 0,
      icon: <Tag className="w-10 h-10 text-[#E9BA67]" />,
    },
    {
      id: 3,
      title: "Produtos Ativos",
      value: summary?.active_products || 0,
      icon: <CheckCircle className="w-10 h-10 text-green-600" />,
    },
    {
      id: 4,
      title: "Produtos Inativos",
      value: summary?.inactive_products || 0,
      icon: <XCircle className="w-10 h-10 text-red-600" />,
    },
  ];

  const pendingProductSummariesState = Array.from({ length: 4 }).map(
    (_, index) => <InfoCardSkeleton key={index} />
  );

  return (
    <Row className="w-full gap-4">
      <Show
        when={!pendingProductSummaries}
        fallback={pendingProductSummariesState}
      >
        {infoCards.map((card) => (
          <InfoCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </Show>
    </Row>
  );
};

export default ProductInfoCards;
