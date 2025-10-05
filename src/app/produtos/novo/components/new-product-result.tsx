"use client";

import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingResultState from "../resultado/components/loading-result-state";
import MetricCard, {
  MetricCardProps,
} from "../resultado/components/metric-card";

const NewProductResult = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const metrics2025: MetricCardProps[] = [
    {
      title: "Valor final de aquisição",
      value: 250,
    },
    { title: "Outros Custos", value: 150 },
    { title: "Custos Fixos", value: 2.5 },
    { title: "ICMS + PIS/COFINS", value: 2.5 },
    { title: "Frete", value: 2.5 },
    { title: "Margem de Lucro", value: 60, variant: "success" as const },
  ];

  const handleFinishAddingProduct = () => {
    // adicionar produto na tabela;
    router.push("/produtos");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Row className="w-full h-full space-x-2">
      <Button
        className="h-full w-20"
        onClick={() => router.push("/produtos/novo")}
        disabled={isLoading}
      >
        <ChevronLeft className="!w-12 !h-12" />
      </Button>
      <Card className="h-full w-full p-6 rounded-md">
        <Show
          when={!isLoading}
          fallback={
            <LoadingResultState onComplete={() => setIsLoading(false)} />
          }
        >
          <div className="grid grid-cols-2 w-full h-full gap-10 mb-4">
            <Column className="space-y-4">
              <h3>Pré Reforma Tributária 2025</h3>
              <div className="grid grid-cols-2 w-full h-full gap-4">
                {metrics2025.map((metric, index) => (
                  <MetricCard
                    key={`metric-2025-${index}`}
                    title={metric.title}
                    value={metric.value}
                    variant={metric.variant}
                  />
                ))}
              </div>
              <MetricCard
                title="Preço de Venda Final"
                value={2.5}
                variant="secondary"
              />
            </Column>
            <Column className="space-y-4">
              <h3>Pré Reforma Tributária 2026</h3>
              <MetricCard
                title="Preço de Venda Final"
                value={3.5}
                variant="primary"
              />
              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Imposto CBS" value={1.5} />
                <MetricCard title="Imposto IBS" value={2.0} />
              </div>
            </Column>
          </div>
          <Button
            className="w-30 flex self-end mt-auto"
            onClick={handleFinishAddingProduct}
          >
            Finalizar
          </Button>
        </Show>
      </Card>
    </Row>
  );
};

export default NewProductResult;
