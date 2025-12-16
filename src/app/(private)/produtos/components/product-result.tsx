"use client";

import { getICMSRate } from "@/src/app/(private)/produtos/constants/icms-table";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { difalCalc } from "@/src/app/(private)/produtos/utils/calcs/difal-calc";
import { presumedProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/presumed-profit-calc";
import { realProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/real-profit-calc";
import { simpleNationalCalc } from "@/src/app/(private)/produtos/utils/calcs/simple-national-calc";
import { getRevenueRangeDataPercentage } from "@/src/app/(private)/produtos/utils/revenue-range-data-percentage";
import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  Loader2,
  Loader2Icon,
} from "lucide-react";
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
  const data = form.watch();

  const unitPrice = data?.unit_price ?? 0;

  const hasEssentialData = unitPrice !== undefined && unitPrice > 0;

  if (!hasEssentialData) {
    const redirectPath =
      isEditMode && productId ? `/produtos/${productId}` : `/produtos/novo`;
    router.replace(redirectPath);

    return <Loader2 className="text-primary animate-spin m-auto w-10 h-10" />;
  }

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

  const pending = pendingPostProduct || pendingUpdateProduct;

  const acquisitionCost = acquisitionCostCalc({
    unitPrice: unitPrice ?? 0,
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
    base: unitPrice ?? 0,
    percentage: data?.icms ?? 0,
  });

  const pisCofinsBase = unitPrice - icmsValue;
  const pisCofinsValue = percentageValueCalc({
    base: pisCofinsBase,
    percentage: data?.pis_cofins ?? 0,
  });

  // IRPJ + CSLL LUCRO PRESUMIDO =======================
  const calcBaseIrpj = percentageValueCalc({
    base: priceToday,
    percentage: 8,
  });

  const calcBaseCsll = percentageValueCalc({
    base: priceToday,
    percentage: 12,
  });

  const irpj = calcBaseIrpj < 0 ? 0 : calcBaseIrpj * data?.irpj_percent;
  const csll = calcBaseCsll < 0 ? 0 : calcBaseCsll * 0.09;

  const presumedProfitIrpjCsll = irpj + csll;

  // IRPJ + CSLL LUCRO REAL =======================
  const bcIrpjCsll =
    priceToday -
    unitPrice -
    fixedCosts -
    salesIcmsValue -
    salesPisCofinsValue -
    shipping -
    othersCosts;

  const realProfitIrpjCsllCalc =
    bcIrpjCsll < 0
      ? 0
      : percentageValueCalc({
          base: bcIrpjCsll,
          percentage: data?.irpj_percent,
        });

  const realProfitIrpjCsll = realProfitIrpjCsllCalc;

  const netProfit = (() => {
    const baseCalcParams = {
      priceToday: priceToday,
      unitPrice: unitPrice,
      icms: icmsValue,
      pisCofins: pisCofinsValue,
      fixedCosts: fixedCosts,
      salesIcms: salesIcmsValue,
      salesPisCofins: salesPisCofinsValue,
      shipping: shipping,
      othersCosts: othersCosts,
    };

    const business = company?.sector === "business";
    const revenueRangeData = getRevenueRangeDataPercentage({ business });
    const revenueRangeKey = (company?.revenue_range ??
      "range_1") as keyof typeof revenueRangeData;

    const das = percentageValueCalc({
      base: priceToday ?? 0,
      percentage: revenueRangeData[revenueRangeKey],
    });

    if (companyRegime === "presumed_profit") {
      return presumedProfitCalc({
        ...baseCalcParams,
        irpjCsll: presumedProfitIrpjCsll,
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
        das,
      });
    }
    return realProfitCalc({
      ...baseCalcParams,
      irpjCsll: realProfitIrpjCsll,
    });
  })();

  const companyState = company?.state;
  const stateDestination = data?.state_destination;
  const isImportedProduct = data?.imported_product === true;

  const internalTaxRate = companyState
    ? getICMSRate(stateDestination!, stateDestination!)
    : 0;

  const interstateTaxRate = stateDestination
    ? getICMSRate(companyState, stateDestination)
    : 0;

  const priceTodayWithDifal = difalCalc({
    priceToday,
    internalTaxRate,
    interstateTaxRate: isImportedProduct ? 4 : interstateTaxRate,
  });

  const isCostumerTaxPayer = data?.costumer_taxpayer === true;
  const finalSalePrice = !isCostumerTaxPayer
    ? priceToday
    : priceToday + priceTodayWithDifal;

  const business = company?.sector === "business";
  const revenueRangeData = getRevenueRangeDataPercentage({ business });
  const revenueRangeKey = (company?.revenue_range ??
    "range_1") as keyof typeof revenueRangeData;
  const das = percentageValueCalc({
    base: priceToday ?? 0,
    percentage: revenueRangeData[revenueRangeKey],
  });

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
      title: "IRPJ + CSLL",
      value:
        companyRegime === "presumed_profit"
          ? presumedProfitIrpjCsll
          : companyRegime === "real_profit"
          ? realProfitIrpjCsll
          : undefined,
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
      price_today: finalSalePrice,
      price_in_2026: finalSalePrice,
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

  const isSimpleNational = company?.tax_regime === "simple_national";

  return (
    <div className="flex flex-col lg:flex-row w-full flex-1 gap-2">
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
          <Card className="flex-1 w-full p-6 rounded-md">
            <LoadingResultState onComplete={() => setIsLoading(false)} />
          </Card>
        }
      >
        <Card className="flex-1 w-full p-6 rounded-md flex flex-col">
          <Column className="space-y-4 w-full flex-1">
            <h3 className="text-lg">
              Pré-Reforma Tributária <strong>2025</strong>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-4">
              {metrics2025.slice(0, 5).map((metric, index) => (
                <MetricCard
                  key={`metric-2025-${index}`}
                  title={metric.title}
                  value={metric.value}
                  variant={metric.variant}
                />
              ))}
              <Show
                when={
                  companyRegime === "presumed_profit" ||
                  companyRegime === "real_profit"
                }
              >
                <MetricCard
                  title="IRPJ + CSLL"
                  value={
                    companyRegime === "presumed_profit"
                      ? presumedProfitIrpjCsll
                      : realProfitIrpjCsll
                  }
                  variant="neutral"
                />
              </Show>
              <Show when={isSimpleNational}>
                <MetricCard title="DAS" value={das} variant="neutral" />
              </Show>
              <div className="col-span-1 md:!col-span-2">
                <MetricCard
                  title="Lucro líquido"
                  value={netProfit}
                  variant="success"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <MetricCard
                  title="Preço de venda final"
                  value={finalSalePrice}
                  variant="secondary"
                />
              </div>
            </div>
          </Column>
        </Card>
        <Card className="flex-1 w-full p-6 rounded-md flex flex-col">
          <Column className="space-y-4 flex-1">
            <Row className="gap-1 items-center">
              <h3 className="text-lg">
                Transição Reforma Tributária <strong>2026</strong>
              </h3>
              <CustomTooltip
                icon={<CircleAlert className="!w-4 !h-4" />}
                message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
              />
            </Row>
            <Column className="gap-4">
              <MetricCard
                title="Base de cálculo IBS/CBS"
                value={firstBase}
                variant="neutral"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-4">
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
