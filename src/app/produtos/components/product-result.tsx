"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { postProduct } from "../services/post-product";
import { updateProduct } from "../services/update-product";
import LoadingResultState from "./loading-result-state";
import MetricCard, { MetricCardProps } from "./metric-card";

const ProductResult = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { form, isEditMode, productId } = useProductForm();

  const data = form.watch();

  const { mutate: post, isPending: pendingPostProduct } = useMutation({
    mutationFn: postProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto adicionado com sucesso!", {
        className: "!bg-green-600/80 !text-white",
      });
      router.push("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600/80 !text-white",
      });
    },
  });

  const { mutate: update, isPending: pendingUpdateProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto atualizado com sucesso!", {
        className: "!bg-green-600/80 !text-white",
      });
      router.push("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600/80 !text-white",
      });
    },
  });

  const handleFinishForm = () => {
    if (isEditMode && productId) {
      const updateProductPayload = {
        id: productId,
        ...data,
      };

      return update({ product: updateProductPayload });
    }

    post({ product: data });
  };

  const pending = pendingPostProduct || pendingUpdateProduct;

  const handleGoBack = () => {
    const path =
      isEditMode && productId ? `/produtos/${productId}` : `/produtos/novo`;
    router.push(path);
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
        onClick={handleGoBack}
        disabled={isLoading || pendingPostProduct}
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
          <div className="grid grid-cols-2 w-full h-fit gap-10 mb-4">
            <Column className="space-y-4">
              <h3 className="text-lg">
                Pré Reforma Tributária <strong>2025</strong>
              </h3>
              <div className="grid grid-cols-2 w-full h-fit gap-4">
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
              <h3 className="text-lg">
                Pré Reforma Tributária <strong>2026</strong>
              </h3>
              <Column className="gap-4 h-full">
                <MetricCard
                  title="Preço de Venda Final"
                  value={3.5}
                  variant="neutral"
                />
                <div className="grid grid-cols-2 gap-4">
                  {metrics2026.map((metric, index) => (
                    <MetricCard
                      key={`metric-2026-${index}`}
                      title={metric.title}
                      value={metric.value}
                      variant={metric.variant}
                    />
                  ))}
                </div>
                <span className="text-center">
                  Os valores de IBS/CBS em 2026, tornam-se{" "}
                  <strong>créditos</strong>
                </span>
              </Column>
              <MetricCard
                title="Valor Total da NF-e"
                value={2.5}
                variant="secondary"
              />
            </Column>
          </div>
          <Button
            className="w-30 flex self-end mt-auto"
            onClick={handleFinishForm}
            disabled={pending}
          >
            <Show when={pending}>
              <Loader2Icon className="animate-spin" />
            </Show>
            Finalizar
          </Button>
        </Show>
      </Card>
    </Row>
  );
};

export default ProductResult;

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
const metrics2026: MetricCardProps[] = [
  {
    title: "IBS (0.1%)",
    value: 250,
  },
  { title: "CBS (0.9%)", value: 150 },
];
