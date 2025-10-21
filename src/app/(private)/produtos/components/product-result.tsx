"use client";

import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import FormFieldTooltip from "@/src/components/form-field-tooltip";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronLeft, CircleAlert, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { postProduct } from "../services/post-product";
import { updateProduct } from "../services/update-product";
import { ProductType } from "../types/product-type";
import { acquisitionCostCalc } from "../utils/acquisition-cost-calc";
import { ibsCbsCalc } from "../utils/ibs-cbs-calc";
import { netProfitCalc } from "../utils/net-profit-calc";
import { priceTodayCalc } from "../utils/price-today-calc";
import { profitMarginCalc } from "../utils/profit-margin-calc";
import { taxCalc } from "../utils/tax-calc";
import LoadingResultState from "./loading-result-state";
import MetricCard, { MetricCardProps } from "./metric-card";

const ProductResult = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { form, isEditMode, productId } = useProductForm();

  const { mutate: post, isPending: pendingPostProduct } = useMutation({
    mutationFn: postProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto adicionado com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      router.push("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600!text-white",
      });
    },
  });

  const { mutate: update, isPending: pendingUpdateProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto atualizado com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      router.push("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const data = form.watch();

  const pending = pendingPostProduct || pendingUpdateProduct;

  const {
    result: acquisitionCost,
    icmsValue,
    pisCofinsValue,
  } = acquisitionCostCalc({
    unitPrice: data?.unit_price ?? 0,
    icms: data.icms ?? 0,
    pisCofins: data?.pis_cofins ?? 0,
    icmsSt: data.icms_st ?? 0,
    ipi: data.ipi ?? 0,
    others: data.others ?? 0,
  });

  const priceToday = priceTodayCalc({
    acquisitionCost,
    fixedCosts: data?.fixed_costs ?? 0,
    othersCost: data?.other_costs ?? 0,
    profit: data?.profit ?? 0,
    salesIcms: data?.sales_icms ?? 0,
    salesPisCofins: data?.sales_pis_cofins ?? 0,
    shipping: data?.shipping ?? 0,
  });

  const profitMargin = profitMarginCalc({
    acquisitionCost,
    profit: data?.profit ?? 0,
  });

  const baseIbsdCbsCalc = ibsCbsCalc({
    unitPrice: data?.unit_price ?? 0,
    icms: icmsValue,
    pisCofins: pisCofinsValue,
  }).baseIbsdCbsCalc;

  const ibs = ibsCbsCalc({
    unitPrice: data?.unit_price ?? 0,
    icms: icmsValue,
    pisCofins: pisCofinsValue,
  }).ibs;

  const cbs = ibsCbsCalc({
    unitPrice: data?.unit_price ?? 0,
    icms: icmsValue,
    pisCofins: pisCofinsValue,
  }).cbs;

  const taxes = taxCalc({
    priceToday: priceToday.result,
    salesIcms: data?.sales_icms ?? 0,
    salesPisCofins: data?.sales_pis_cofins ?? 0,
  });

  const netProfit = netProfitCalc({
    profit: profitMargin,
    fixedCosts: acquisitionCost * ((data?.fixed_costs ?? 0) / 100),
    shipping: acquisitionCost * ((data?.shipping ?? 0) / 100),
    otherCosts: acquisitionCost * ((data?.other_costs ?? 0) / 100),
  });

  const priceIn2026 = priceToday.result;

  const metrics2025: MetricCardProps[] = [
    {
      title: "Valor de aquisição",
      value: acquisitionCost || 0,
    },
    {
      title: "Outros custos",
      value: acquisitionCost * ((data?.other_costs ?? 0) / 100),
    },
    {
      title: "Custos fixos",
      value: acquisitionCost * ((data?.fixed_costs ?? 0) / 100),
    },
    {
      title: "ICMS + PIS/COFINS",
      value: taxes,
    },
    {
      title: "Frete",
      value: acquisitionCost * ((data?.shipping ?? 0) / 100),
    },
    {
      title: "Lucro líquido",
      value: netProfit,
      variant: "success" as const,
    },
  ];

  const metrics2026: MetricCardProps[] = [
    {
      title: "IBS (0.1%)",
      value: ibs,
    },
    {
      title: "CBS (0.9%)",
      value: cbs,
    },
  ];

  const handleFinishForm = () => {
    const productPayload: ProductType = {
      ...data,
      status: "ACTIVE",
      price_today: priceToday.result,
      price_in_2026: priceIn2026,
    };

    if (isEditMode && productId) {
      return update({
        product: {
          id: productId,
          ...productPayload,
        },
      });
    }

    return post({ product: productPayload });
  };

  const handleGoBack = () => {
    const path =
      isEditMode && productId ? `/produtos/${productId}` : `/produtos/novo`;
    router.push(path);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-fit h-full gap-2">
      <Show when={!isLoading}>
        <Button
          className="hidden lg:flex h-full w-20"
          onClick={handleGoBack}
          disabled={isLoading || pendingPostProduct}
        >
          <ChevronLeft className="!w-12 !h-12" />
        </Button>
      </Show>
      <Show
        when={!isLoading}
        fallback={
          <Card className="h-full w-full p-6 rounded-md">
            <LoadingResultState onComplete={() => setIsLoading(false)} />
          </Card>
        }
      >
        <Card className="h-full w-full p-6 rounded-md">
          <Column className="space-y-4 w-full">
            <h3 className="text-lg">
              Pré-Reforma Tributária <strong>2025</strong>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-4">
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
              title="Preço de venda final"
              value={priceToday.result}
              variant="secondary"
            />
          </Column>
        </Card>
        <Card className="h-full w-full p-6 rounded-md">
          <Column className="space-y-4 h-full">
            <Row className="gap-2 items-center">
              <h3 className="text-lg">
                Transição Reforma Tributária <strong>2026</strong>
              </h3>
              <FormFieldTooltip
                icon={<CircleAlert className="text-[#66289B] !w-6 !h-6" />}
                message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
              />
            </Row>
            <Column className="gap-4">
              <MetricCard
                title="Base de cálculo IBS/CBS"
                value={baseIbsdCbsCalc}
                variant="neutral"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
                {metrics2026.map((metric, index) => (
                  <MetricCard
                    key={`metric-2026-${index}`}
                    title={metric.title}
                    value={metric.value}
                    variant={metric.variant}
                  />
                ))}
              </div>
            </Column>
            <MetricCard
              title="Preço de venda final"
              value={priceToday.result}
              variant="secondary"
            />
          </Column>
          <Button
            className="hidden lg:flex md:w-40 h-12 self-end mt-4"
            onClick={handleFinishForm}
            disabled={pending}
          >
            <Show when={pending} fallback={<Check />}>
              <Loader2Icon className="animate-spin" />
            </Show>
            Finalizar
          </Button>
        </Card>
        <Row className="max-lg:mt-2 lg:hidden gap-2 md:w-fit md:self-end">
          <Button
            className="lg:hidden h-full"
            onClick={handleGoBack}
            variant={"outline"}
            disabled={isLoading || pendingPostProduct}
          >
            <ChevronLeft className="!w-6 !h-6" />
          </Button>
          <Button
            className="flex-1 md:flex-none md:w-40 h-12 flex items-center"
            onClick={handleFinishForm}
            disabled={pending}
          >
            <Show when={pending} fallback={<Check />}>
              <Loader2Icon className="animate-spin" />
            </Show>
            Finalizar
          </Button>
        </Row>
      </Show>
    </div>
  );
};

export default ProductResult;
