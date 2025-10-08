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
            {...register("fixed_costs")}
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
            {...register("sales_icms", {
              required: "Campo obrigatório",
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
            {...register("sales_pis_cofins", {
              required: "Campo obrigatório",
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
            {...register("shipping")}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="other_costs">Outros Custos (%)</Label>
          <Input
            id="other_costs"
            type="number"
            placeholder="0,00%"
            {...register("other_costs")}
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
              required: "Campo obrigatório",
            })}
            error={errors.profit?.message}
          />
        </Column>
      </form>
    </Card>
  );
};

export default PricingForm;
