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
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { dateFormatter } from "@/src/helpers/date-formatter";
import { useAuth } from "@/src/providers/auth-provider";
import { DialogTitle } from "@radix-ui/react-dialog";

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
      gridSpan: "col-span-1 md:col-span-2",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="flex flex-col md:min-w-3xl md:p-12 overflow-y-auto h-[96dvh]">
        <DialogHeader className="gap-4">
          <Column className="gap-1">
            <DialogTitle className="text-2xl">{product?.name}</DialogTitle>
            <Row className="gap-2">
              <span className="text-sm text-muted-foreground">
                {product?.sku}
              </span>
              <Show when={Boolean(product?.ncm)}>
                <Separator orientation="vertical" />
                {/* TO-DO: NCM FORMATTER */}
                <span className="text-sm text-muted-foreground">
                  {product?.ncm}
                </span>
              </Show>
              <Separator orientation="vertical" />
              {/* TO-DO: BADGE CUSTOMIZADA ATIVADO/DESATIVADO */}
              <span className="text-sm text-muted-foreground">
                {product?.status}
              </span>
            </Row>
          </Column>
          <Row className="gap-8">
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
          </Row>
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
          <div className="grid grid-cols-5 gap-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
