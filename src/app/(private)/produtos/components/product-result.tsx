"use client";

import { getICMSRate } from "@/src/app/(private)/produtos/constants/icms-table";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { difalCalc } from "@/src/app/(private)/produtos/utils/calcs/difal-calc";
import { icmsStCalc } from "@/src/app/(private)/produtos/utils/calcs/icms-st-calc";
import { markupCalc } from "@/src/app/(private)/produtos/utils/calcs/markup-calc";
import { presumedProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/presumed-profit-calc";
import { ProfitabilityCalc } from "@/src/app/(private)/produtos/utils/calcs/profitability-calc";
import { realProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/real-profit-calc";
import { simpleNationalCalc } from "@/src/app/(private)/produtos/utils/calcs/simple-national-calc";
import { suggestedProductPriceCalc } from "@/src/app/(private)/produtos/utils/calcs/suggested-product-price-calc";
import { getRevenueRangeDataPercentage } from "@/src/app/(private)/produtos/utils/revenue-range-data-percentage";
import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
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

  const icmsStInputExists = data?.icms_st !== 0 && data?.icms_st !== undefined;
  const companyRegime = company?.tax_regime;
  const business = company?.sector === "business";
  const hasIcmsSt = data?.has_icms_st === true;

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

  const ibs = ibsCbsCalc({
    base1: firstBase,
  }).ibs;

  const cbs = ibsCbsCalc({
    base1: firstBase,
  }).cbs;

  const markup = markupCalc({
    fixedCosts: data?.fixed_costs ?? 0,
    othersCosts: data?.other_costs ?? 0,
    profit: data?.profit ?? 0,
    salesIcms: data?.sales_icms ?? 0,
    salesPisCofins: data?.sales_pis_cofins ?? 0,
    shipping: data?.shipping ?? 0,
    range: company?.revenue_range,
    business,
    isSimpleNational: companyRegime === "simple_national",
  });

  const suggestedProductPrice = suggestedProductPriceCalc({
    acquisitionCost,
    markup,
  });

  const taxes = taxCalc({
    suggestedProductPrice: suggestedProductPrice,
    salesIcms: data?.sales_icms ?? 0,
    salesPisCofins: data?.sales_pis_cofins ?? 0,
  });

  const salesIcmsValue = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: data?.sales_icms,
  });

  const salesPisCofinsValue = percentageValueCalc({
    base: suggestedProductPrice - salesIcmsValue,
    percentage: data?.sales_pis_cofins,
  });

  const icmsSt = icmsStCalc({
    mva: data?.mva ?? 0,
    suggestedProductPrice,
    salesIcmsInput: data?.sales_icms,
    stateDestination: data?.state_destination,
    hasIcmsSt,
  });

  const fixedCosts = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: data?.fixed_costs ?? 0,
  });

  const othersCosts = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: data?.other_costs ?? 0,
  });

  const shipping = percentageValueCalc({
    base: suggestedProductPrice,
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

  const conditionalIcmsSt = icmsStInputExists || hasIcmsSt ? 0 : icmsSt;

  // IRPJ + CSLL LUCRO PRESUMIDO =======================
  const calcBaseIrpj = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: 8,
  });

  const calcBaseCsll = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: 12,
  });

  const irpj = calcBaseIrpj < 0 ? 0 : calcBaseIrpj * data?.irpj_percent;
  const csll = calcBaseCsll < 0 ? 0 : calcBaseCsll * 0.09;

  const presumedProfitIrpjCsll = irpj + csll;

  // IRPJ + CSLL LUCRO REAL =======================
  const bcIrpjCsll =
    suggestedProductPrice -
    unitPrice -
    fixedCosts -
    salesIcmsValue -
    salesPisCofinsValue -
    shipping -
    othersCosts -
    conditionalIcmsSt;

  const realProfitIrpjCsllCalc =
    bcIrpjCsll < 0
      ? 0
      : percentageValueCalc({
          base: bcIrpjCsll,
          percentage: data?.irpj_percent,
        });

  const netProfit = (() => {
    const baseCalcParams = {
      suggestedProductPrice,
      acquisitionCost,
      icms: icmsValue,
      pisCofins: pisCofinsValue,
      fixedCosts,
      salesIcms: salesIcmsValue,
      salesPisCofins: salesPisCofinsValue,
      shipping: shipping,
      othersCosts,
    };

    const revenueRangeData = getRevenueRangeDataPercentage({ business });
    const revenueRangeKey = (company?.revenue_range ??
      "range_1") as keyof typeof revenueRangeData;

    const das = percentageValueCalc({
      base: suggestedProductPrice ?? 0,
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
      irpjCsll: realProfitIrpjCsllCalc,
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

  const suggestedProductPriceWithDifal = difalCalc({
    suggestedProductPrice,
    internalTaxRate,
    interstateTaxRate: isImportedProduct ? 4 : interstateTaxRate,
  });

  const isCostumerTaxPayer = data?.costumer_taxpayer === true;
  const finalSalePrice = !isCostumerTaxPayer
    ? suggestedProductPrice + conditionalIcmsSt
    : suggestedProductPrice + suggestedProductPriceWithDifal;

  const revenueRangeData = getRevenueRangeDataPercentage({ business });

  const revenueRangeKey = (company?.revenue_range ??
    "range_1") as keyof typeof revenueRangeData;

  const das = percentageValueCalc({
    base: suggestedProductPrice ?? 0,
    percentage: revenueRangeData[revenueRangeKey],
  });

  const profitability = ProfitabilityCalc({
    netProfit,
    suggestedProductPrice,
  });

  const metrics2025: MetricCardProps[] = [
    {
      title: "Valor de aquisição",
      value: acquisitionCost || 0,
    },
    {
      title: "Outros custos",
      value: suggestedProductPrice * ((data?.other_costs ?? 0) / 100),
    },
    {
      title: "Custos fixos",
      value: suggestedProductPrice * ((data?.fixed_costs ?? 0) / 100),
    },
    {
      title: "Frete",
      value: suggestedProductPrice * ((data?.shipping ?? 0) / 100),
    },
    {
      title: "ICMS + PIS/COFINS",
      value: taxes,
    },
    {
      title: "ICMS ST",
      value: icmsSt,
    },
    {
      title: "IRPJ + CSLL",
      value:
        companyRegime === "presumed_profit"
          ? presumedProfitIrpjCsll
          : companyRegime === "real_profit"
          ? realProfitIrpjCsllCalc
          : undefined,
    },
    {
      title: "Markup",
      value: markup,
      type: "percentage",
    },
    {
      title: "Rentabilidade",
      value: profitability,
      type: "percentage",
      variant: "success",
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
    <Show
      when={!isLoading}
      fallback={
        <Card className="flex-1 w-full h-full p-6 rounded-md">
          <LoadingResultState onComplete={() => setIsLoading(false)} />
        </Card>
      }
    >
      <Column className="h-full gap-4">
        <Flex className="flex-col lg:flex-row w-full flex-1 gap-4">
          <Button
            asChild
            className="hidden lg:flex h-full w-20"
            disabled={isLoading || pendingPostProduct}
          >
            <Link href={backPath}>
              <ChevronLeft className="w-12! h-12!" />
            </Link>
          </Button>
          <Card className="flex-1 w-full p-6 rounded-md flex flex-col">
            <Column className="space-y-4 w-full flex-1">
              <h3 className="text-lg">
                Pré-Reforma Tributária <strong>2025</strong>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-4">
                {metrics2025.slice(0, 9).map((metric, index) => (
                  <MetricCard
                    key={`metric-2025-${index}`}
                    title={metric.title}
                    value={metric.value}
                    variant={metric.variant}
                    type={metric.type}
                  />
                ))}
                <Show when={isSimpleNational}>
                  <MetricCard title="DAS" value={das} variant="neutral" />
                </Show>
                <div className="col-span-1">
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
                  icon={<CircleAlert className="w-4! h-4!" />}
                  message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
                />
              </Row>
              <Column className="gap-4">
                <MetricCard
                  title="Base de cálculo IBS/CBS"
                  value={firstBase}
                  variant="neutral"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-4 gap-4">
                  {metrics2026.map((metric, index) => (
                    <MetricCard
                      key={`metric-2026-${index}`}
                      title={metric.title}
                      value={metric.value}
                      variant={metric.variant}
                      type={metric.type}
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
          </Card>
        </Flex>
        <Row className="gap-2 md:w-fit md:self-end">
          <Button
            asChild
            className="lg:hidden h-full"
            variant="outline"
            disabled={isLoading || pendingPostProduct}
          >
            <Link href={backPath}>
              <ChevronLeft className="w-6! h-6!" />
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
      </Column>
    </Show>
  );
};

export default ProductResult;
