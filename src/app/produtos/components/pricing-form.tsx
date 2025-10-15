"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import FormFieldTooltip from "@/src/components/form-field-tooltip";

const PricingForm = () => {
  const { form } = useProductForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
      <h3>Precificação</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="fixed_costs">Custos Fixos (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="fixed_costs"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("fixed_costs", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.fixed_costs?.message}
              />
              <FormFieldTooltip message="Custos Fixos" />
            </Row>
            <Show when={errors.fixed_costs?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.fixed_costs?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="sales_icms" required>
            ICMS Venda (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="sales_icms"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("sales_icms", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.sales_icms?.message}
              />
              <FormFieldTooltip message="ICMS Venda" />
            </Row>
            <Show when={errors.sales_icms?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.sales_icms?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="sales_pis_cofins" required>
            PIS/COFINS Venda (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="sales_pis_cofins"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("sales_pis_cofins", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.sales_pis_cofins?.message}
              />
              <FormFieldTooltip message="PIS/COFINS Venda" />
            </Row>
            <Show when={errors.sales_pis_cofins?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.sales_pis_cofins?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="shipping">Frete (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="shipping"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("shipping", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.shipping?.message}
              />
              <FormFieldTooltip message="Frete" />
            </Row>
            <Show when={errors.shipping?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.shipping?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="other_costs">Outros Custos (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="other_costs"
                type="number"
                placeholder="0,00%"
                min="0"
                max="100"
                {...register("other_costs", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                })}
                error={errors.other_costs?.message}
              />
              <FormFieldTooltip message="Outros Custos" />
            </Row>
            <Show when={errors.other_costs?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.other_costs?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="profit" required>
            Margem de Lucro (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Input
                id="profit"
                type="number"
                placeholder="0,00%"
                {...register("profit", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" || value === null || isNaN(value)
                      ? 0
                      : Number(value),
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                })}
                error={errors.profit?.message}
              />
              <FormFieldTooltip message="Margem de Lucro" />
            </Row>
            <Show when={errors.profit?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.profit?.message}
              </span>
            </Show>
          </Column>
        </Column>
      </form>
    </Card>
  );
};

export default PricingForm;
