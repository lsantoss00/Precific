"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const PricingForm = () => {
  const { form } = useProductForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
      <h3>Precificação</h3>
      <form className="grid grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="fixed_costs">Custos Fixos (%)</Label>
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
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="sales_icms" required>
            ICMS Venda (%)
          </Label>
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
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="sales_pis_cofins" required>
            PIS/COFINS Venda (%)
          </Label>
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
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="shipping">Frete (%)</Label>
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
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="other_costs">Outros Custos (%)</Label>
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
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="profit" required>
            Margem de Lucro (%)
          </Label>
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
        </Column>
      </form>
    </Card>
  );
};

export default PricingForm;
