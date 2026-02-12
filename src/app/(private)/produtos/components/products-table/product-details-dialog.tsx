"use client";

import MetricCard, {
  MetricCardProps,
} from "@/src/app/(private)/produtos/components/metric-card";
import { ProductResponseType } from "@/src/app/(private)/produtos/types/product-type";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  Separator,
} from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import StatusBadge from "@/src/components/status-badge";
import { dateFormatter } from "@/src/helpers/date-formatter";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useAuth } from "@/src/providers/auth-provider";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleAlert } from "lucide-react";

interface ProductDetailsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product: Partial<ProductResponseType>;
}

const ProductDetailsDialog = ({
  open,
  onOpenChange,
  product,
}: ProductDetailsDialogProps) => {
  const { company } = useAuth();
  const isMd = useMediaQuery(`(min-width: 768px)`);

  const isSimpleNational = company?.taxRegime === "simple_national";

  const metrics2025: (MetricCardProps & {
    gridSpan?: string;
    condition?: boolean;
  })[] = [
    {
      title: "Valor de aquisição",
      value: 10,
    },
    {
      title: "Outros custos",
      value: 10,
    },
    {
      title: "Custos fixos",
      value: 10,
    },
    {
      title: "Frete",
      value: 10,
    },
    {
      title: "ICMS + PIS/COFINS",
      value: 10,
    },
    {
      title: "ICMS ST",
      value: 10,
    },
    {
      title: "DAS",
      value: 10,
      variant: "neutral" as const,
      condition: isSimpleNational,
    },
    {
      title: "IRPJ + CSLL",
      value: 10,
      condition: !isSimpleNational,
    },
    {
      title: "Markup",
      value: 10,
      type: "percentage" as const,
    },
    {
      title: "Rentabilidade",
      value: 10,
      type: "percentage" as const,
      variant: "success" as const,
    },
    {
      title: "Lucro líquido",
      value: 10,
      variant: "success" as const,
      gridSpan: "col-span-1",
    },
    {
      title: "Preço de venda final",
      value: 10,
      variant: "secondary" as const,
      gridSpan: "col-span-1 sm:col-span-2",
    },
  ];

  const metrics2026: (MetricCardProps & {
    gridSpan?: string;
    condition?: boolean;
  })[] = [
    {
      title: "Base de cálculo IBS/CBS",
      value: 10,
      gridSpan: "col-span-1 sm:col-span-2 md:col-span-1",
    },
    {
      title: "IBS (0.1%)",
      value: 10,
    },
    {
      title: "CBS (0.9%)",
      value: 10,
    },
    {
      title: "Preço de venda final",
      value: 10,
      variant: "secondary" as const,
      gridSpan: "col-span-1 sm:col-span-2 md:col-span-3",
    },
  ];

  const ncm = product?.ncm
    ?.toString()
    .replace(/^(\d{4})(\d{2})(\d{2})$/, "$1.$2.$3");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="flex flex-col min-w-[96dvw] lg:min-w-4xl py-10 sm:p-8 overflow-y-auto h-[96dvh]">
        <DialogHeader className="sm:gap-4 text-start">
          <Column className="sm:gap-1">
            <DialogTitle className="text-2xl text-ellipsis truncate">
              {product?.name}
            </DialogTitle>
            <Flex className="flex-col sm:flex-row gap-2">
              <span className="text-sm text-muted-foreground  text-ellipsis truncate">
                {product?.sku}
              </span>
              <Show when={Boolean(product?.ncm)}>
                <Show when={isMd}>
                  <Separator orientation="vertical" />
                </Show>
                <span className="text-sm text-muted-foreground">{ncm}</span>
              </Show>
              <Show when={isMd}>
                <Separator orientation="vertical" />
              </Show>
              <StatusBadge status={product?.status!} />
            </Flex>
          </Column>
          <Flex className="flex-col sm:flex-row gap-2 sm:gap-8 text-start">
            <Column>
              <span className="text-sm text-muted-foreground">
                Data de Criação:
              </span>
              <span>{dateFormatter(product?.createdAt!, true)}</span>
            </Column>
            <Column>
              <span className="text-sm text-muted-foreground">
                Última Atualização:
              </span>
              <span>{dateFormatter(product?.updatedAt!, true)}</span>
            </Column>
          </Flex>
          <Column>
            <span className="text-sm text-muted-foreground">Observações:</span>
            <p>
              {product?.observations || "Nenhuma observação foi adicionada."}
            </p>
          </Column>
        </DialogHeader>
        <Separator />
        <Column className="gap-2">
          <span>
            Pré-Reforma Tributária <strong>2025</strong>
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {metrics2025
              .filter(
                (metric) => metric.condition === undefined || metric.condition,
              )
              .map((metric, index) => (
                <div key={`metric-2025-${index}`} className={metric.gridSpan}>
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    secondValue={metric.secondValue}
                    variant={metric.variant}
                    type={metric.type}
                  />
                </div>
              ))}
          </div>
        </Column>
        <Separator />
        <Column className="space-y-4 flex-1">
          <h3 className="text-lg">
            Transição Reforma Tributária{" "}
            <span className="inline-flex items-center gap-2">
              <strong>2026</strong>
              <CustomTooltip
                icon={<CircleAlert className="w-4 h-4" />}
                message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
              />
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {metrics2026.map((metric, index) => (
              <div key={`metric-2026-${index}`} className={metric.gridSpan}>
                <MetricCard
                  title={metric.title}
                  value={metric.value}
                  secondValue={metric.secondValue}
                  variant={metric.variant}
                  type={metric.type}
                />
              </div>
            ))}
          </div>
        </Column>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
