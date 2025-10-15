"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import FormFieldTooltip from "@/src/components/form-field-tooltip";
import { acquisitionCostCalc } from "../utils/acquisition-cost-calc";
import MetricCard from "./metric-card";

const AcquisitionCostForm = () => {
  const { form } = useProductForm();
  const {
    register,
    formState: { errors },
  } = form;

  const data = form.watch();

  const acquisitionCost = acquisitionCostCalc({
    unitPrice: data?.unit_price ?? 0,
    icms: data.icms ?? 0,
    pisCofins: data?.pis_cofins ?? 0,
    icmsSt: data.icms_st ?? 0,
    ipi: data.ipi ?? 0,
    others: data.others ?? 0,
  });

  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
      <h3>Custo de Aquisição</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="unit_price" required>
            Preço Unitário NF-e (R$)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="unit_price"
                type="number"
                placeholder="R$ 0,00"
                {...register("unit_price", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                })}
                error={errors.unit_price?.message}
              />
              <FormFieldTooltip message="Preço Unitário" />
            </Row>
            <Show when={errors.unit_price?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.unit_price?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms" required>
            ICMS (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="icms"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("icms", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.icms?.message}
              />
              <FormFieldTooltip message="ICMS" />
            </Row>
            <Show when={errors.icms?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.icms?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="pis_cofins" required>
            PIS/COFINS (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="pis_cofins"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("pis_cofins", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.pis_cofins?.message}
              />
              <FormFieldTooltip message="PIS/COFINS" />
            </Row>
            <Show when={errors.pis_cofins?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.pis_cofins?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms_st">ICMS ST (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="icms_st"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("icms_st", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.icms_st?.message}
              />
              <FormFieldTooltip message="ICMS ST" />
            </Row>
            <Show when={errors.icms_st?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.icms_st?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="ipi">IPI (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="ipi"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("ipi", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.ipi?.message}
              />
              <FormFieldTooltip message="IPI" />
            </Row>
            <Show when={errors.ipi?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.ipi?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="others">Outros (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="others"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("others", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.others?.message}
              />
              <FormFieldTooltip message="Outros" />
            </Row>
            <Show when={errors.others?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.others?.message}
              </span>
            </Show>
          </Column>
        </Column>
      </form>
      <MetricCard
        title="Valor final de Aquisição"
        value={acquisitionCost.result || 0}
      />
    </Card>
  );
};

export default AcquisitionCostForm;
