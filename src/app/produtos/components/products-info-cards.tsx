"use client";

import Row from "@/src/components/core/row";
import { CheckCircle, Package, Tag, XCircle } from "lucide-react";
import InfoCard from "./info-card";

const ProductInfoCards = () => {
  return (
    <Row className="w-full gap-4">
      {infoCards.map((card) => (
        <InfoCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </Row>
  );
};

export default ProductInfoCards;

const infoCards = [
  {
    id: 1,
    title: "Produtos Cadastrados",
    value: "1.234",
    icon: <Package className="w-10 h-10 text-[#66289B]" />,
  },
  {
    id: 2,
    title: "Produtos Precificados",
    value: "R$ 845",
    icon: <Tag className="w-10 h-10 text-[#E9BA67]" />,
  },
  {
    id: 3,
    title: "Produtos Ativos",
    value: "950",
    icon: <CheckCircle className="w-10 h-10 text-green-600" />,
  },
  {
    id: 4,
    title: "Produtos Inativos",
    value: "284",
    icon: <XCircle className="w-10 h-10 text-red-600" />,
  },
];
