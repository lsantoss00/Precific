"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
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
      <form className="grid grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="unit_price" required>
            Preço Unitário NF-e (R$)
          </Label>
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
            })}
            error={errors.unit_price?.message}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms" required>
            ICMS (%)
          </Label>
          <Input
            id="icms"
            type="number"
            placeholder="0,00%"
            {...register("icms", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || value === null || isNaN(value)
                  ? 0
                  : Number(value),
              required: "Campo obrigatório",
            })}
            error={errors.icms?.message}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="pis_cofins" required>
            PIS/COFINS (%)
          </Label>
          <Input
            id="pis_cofins"
            type="number"
            placeholder="0,00%"
            {...register("pis_cofins", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || value === null || isNaN(value)
                  ? 0
                  : Number(value),
              required: "Campo obrigatório",
            })}
            error={errors.pis_cofins?.message}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms_st">ICMS ST (%)</Label>
          <Input
            id="icms_st"
            type="number"
            placeholder="0,00%"
            {...register("icms_st", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || value === null || isNaN(value)
                  ? 0
                  : Number(value),
            })}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="ipi">IPI (%)</Label>
          <Input
            id="ipi"
            type="number"
            placeholder="0,00%"
            {...register("ipi", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || value === null || isNaN(value)
                  ? 0
                  : Number(value),
            })}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="others">Outros (%)</Label>
          <Input
            id="others"
            type="number"
            placeholder="0,00%"
            {...register("others", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || value === null || isNaN(value)
                  ? 0
                  : Number(value),
            })}
          />
        </Column>
      </form>
      <MetricCard title="Valor final de Aquisição" value={acquisitionCost} />
    </Card>
  );
};

export default AcquisitionCostForm;
