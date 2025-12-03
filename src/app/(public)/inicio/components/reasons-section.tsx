import ReasonCard from "@/src/app/(public)/inicio/components/reason-card";
import Column from "@/src/components/core/column";
import { Brain, ChartColumn, FileSpreadsheet } from "lucide-react";

const ReasonsSection = () => {
  return (
    <Column className="bg-background w-full h-150 items-center">
      <h2 className="font-bold text-5xl text-center mt-25">
        Em poucos cliques, do custo ao lucro ideal
      </h2>
      <div className="grid grid-cols-3 gap-8 flex-1 items-center">
        {reasonsMap?.map((reason, index) => (
          <ReasonCard key={index} reason={reason} />
        ))}
      </div>
    </Column>
  );
};

export default ReasonsSection;

const reasonsMap = [
  {
    icon: <FileSpreadsheet />,
    title: "Importe sua tabela de produtos",
    description:
      "Através do seu sistema, exporte seus produtos e insira-os na Precific.",
  },
  {
    icon: <Brain />,
    title: "A Precific faz os cálculos",
    description:
      "Nossa I.A realiza os cálculos para você! Seu único trabalho é fornecer os dados necessários.",
  },
  {
    icon: <ChartColumn />,
    title: "Exporte seus relatórios",
    description:
      "Veja o preço ideal para seus produtos e exporte em tabela para o acompanhamento.",
  },
];
