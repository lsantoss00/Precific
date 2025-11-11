"use client";

import { getICMSRate } from "@/src/app/(private)/produtos/constants/icms-table";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { difalCalc } from "@/src/app/(private)/produtos/utils/calcs/difal-calc";
import { presumedProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/presumed-profit-calc";
import { realProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/real-profit-calc";
import { simpleNationalCalc } from "@/src/app/(private)/produtos/utils/calcs/simple-national-calc";
import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronLeft, CircleAlert, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { postProduct } from "../services/post-product";
import { updateProduct } from "../services/update-product";
import { ProductType } from "../types/product-type";
import { acquisitionCostCalc } from "../utils/calcs/acquisition-cost-calc";
import { ibsCbsCalc } from "../utils/calcs/ibs-cbs-calc";
import { percentageValueCalc } from "../utils/calcs/percentage-value-calc";
import { priceTodayCalc } from "../utils/calcs/price-today-calc";
import { taxCalc } from "../utils/calcs/tax-calc";
import LoadingResultState from "./loading-result-state";
import MetricCard, { MetricCardProps } from "./metric-card";

const ProductResult = () => {
  const { company } = useAuth();
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
      router.replace("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
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

  const acquisitionCost = acquisitionCostCalc({
    unitPrice: data?.unit_price ?? 0,
    icms: data.icms ?? 0,
    pisCofins: data?.pis_cofins ?? 0,
    icmsSt: data.icms_st ?? 0,
    ipi: data.ipi ?? 0,
    others: data.others ?? 0,
  });

  const percentSum =
    ((data.fixed_costs ?? 0) + (data.shipping ?? 0) + (data.other_costs ?? 0)) /
    100;
  const markupBase = acquisitionCost + acquisitionCost * percentSum;
  const firstBase = markupBase + markupBase * ((data?.profit ?? 0) / 100);

  const companyRegime = company?.tax_regime;

  const priceToday = priceTodayCalc({
    firstBase,
    salesIcms: data?.sales_icms ?? 0,
    salesPisCofins: data?.sales_pis_cofins ?? 0,
    isSimpleNational: companyRegime === "simple_national",
    range: company?.revenue_range,
    sector: company?.sector,
  });

  const ibs = ibsCbsCalc({
    base1: firstBase,
  }).ibs;

  const cbs = ibsCbsCalc({
    base1: firstBase,
  }).cbs;

  const taxes = taxCalc({
    priceToday: priceToday,
    salesIcms: data?.sales_icms ?? 0,
    salesPisCofins: data?.sales_pis_cofins ?? 0,
  });

  const salesIcmsValue = percentageValueCalc({
    base: priceToday,
    percentage: data?.sales_icms,
  });

  const salesPisCofinsValue = percentageValueCalc({
    base: priceToday - salesIcmsValue,
    percentage: data?.sales_pis_cofins,
  });

  const fixedCosts = percentageValueCalc({
    base: acquisitionCost,
    percentage: data?.fixed_costs ?? 0,
  });

  const othersCosts = percentageValueCalc({
    base: acquisitionCost,
    percentage: data?.other_costs ?? 0,
  });

  const shipping = percentageValueCalc({
    base: acquisitionCost,
    percentage: data?.shipping ?? 0,
  });

  const icmsValue = percentageValueCalc({
    base: data?.unit_price ?? 0,
    percentage: data?.icms ?? 0,
  });

  const pisCofinsBase = data?.unit_price - icmsValue;
  const pisCofinsValue = percentageValueCalc({
    base: pisCofinsBase,
    percentage: data?.pis_cofins ?? 0,
  });

  const netProfit = (() => {
    const baseCalcParams = {
      priceToday: priceToday,
      unitPrice: data?.unit_price,
      icms: icmsValue,
      pisCofins: pisCofinsValue,
      fixedCosts: fixedCosts,
      salesIcms: salesIcmsValue,
      salesPisCofins: salesPisCofinsValue,
      shipping: shipping,
      othersCosts: othersCosts,
    };

    if (companyRegime === "presumed_profit") {
      return presumedProfitCalc({
        ...baseCalcParams,
        irpjPercent: data?.irpj_percent, // Bloquear campo PISCOFINS (0), quando for lucro presumido
      });
    }

    if (
      companyRegime === "simple_national" &&
      company?.revenue_range &&
      company?.sector
    ) {
      return simpleNationalCalc({
        ...baseCalcParams,
        range: company.revenue_range,
        sector: company.sector,
      });
    }
    return realProfitCalc({
      ...baseCalcParams,
      irpjCsllPercent: 34,
    });
  })();

  const companyState = company?.state;
  const stateDestination = form.watch("state_destination");

  const originTaxRate = companyState
    ? getICMSRate(companyState, companyState)
    : 0;
  const destinationTaxRate = stateDestination
    ? getICMSRate(stateDestination, stateDestination)
    : 0;

  const priceTodayWithDifal = difalCalc({
    priceToday,
    originTaxRate,
    destinationTaxRate,
  });

  const isCostumerTaxPayer = data?.costumer_taxpayer === true;
  const finalSalePrice = isCostumerTaxPayer
    ? priceToday
    : priceToday + priceTodayWithDifal;

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
      price_today: priceToday,
      price_in_2026: priceToday,
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

  const backPath =
    isEditMode && productId ? `/produtos/${productId}` : `/produtos/novo`;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-fit h-full gap-2">
      <Show when={!isLoading}>
        <Button
          asChild
          className="hidden lg:flex h-full w-20"
          disabled={isLoading || pendingPostProduct}
        >
          <Link href={backPath}>
            <ChevronLeft className="!w-12 !h-12" />
          </Link>
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
              value={finalSalePrice}
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
              <CustomTooltip
                icon={<CircleAlert className="text-[#66289B] !w-6 !h-6" />}
                message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
              />
            </Row>
            <Column className="gap-4">
              <MetricCard
                title="Base de cálculo IBS/CBS"
                value={firstBase}
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
              value={finalSalePrice}
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
            asChild
            className="lg:hidden h-full"
            variant="outline"
            disabled={isLoading || pendingPostProduct}
          >
            <Link href={backPath}>
              <ChevronLeft className="!w-6 !h-6" />
            </Link>
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
