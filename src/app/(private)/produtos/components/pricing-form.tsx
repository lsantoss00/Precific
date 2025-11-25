"use client";

import { getICMSRate } from "@/src/app/(private)/produtos/constants/icms-table";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import SelectInput from "@/src/components/core/select-input";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { useAuth } from "@/src/providers/auth-provider";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const PricingForm = () => {
  const { company } = useAuth();
  const { form } = useProductForm();
  const {
    control,
    formState: { errors },
  } = form;

  const isRealProfit = company?.tax_regime === "real_profit";
  const isPresumedProfit = company?.tax_regime === "presumed_profit";
  const isSimpleNational = company?.tax_regime === "simple_national";

  const icmsSt = form.watch("icms_st") ?? 0;

  const isImportedProduct = !!form.watch("imported_product");
  const isInterstateSale = !!form.watch("interstate_sale");
  const stateDestination = form.watch("state_destination");

  const isSixthRevenueRange = company?.revenue_range === "range_6";

  useEffect(() => {
    if (icmsSt > 0) {
      form.setValue("sales_icms", 0);
      return;
    }

    if (isImportedProduct) {
      form.setValue("sales_icms", 4);
      return;
    }

    if (isInterstateSale && stateDestination && company?.state) {
      const icmsRate = getICMSRate(company.state, stateDestination);
      form.setValue("sales_icms", icmsRate);
      return;
    }
  }, [
    icmsSt,
    isImportedProduct,
    isInterstateSale,
    stateDestination,
    company?.state,
    form,
  ]);
  return (
    <Card className="w-full p-6 rounded-md flex space-y-6">
      <h3>Precificação</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="fixed_costs">Custos Fixos (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="fixed_costs"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="fixed_costs"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === "" || value === null) {
                        field.onChange(0);
                      }
                      field.onBlur();
                    }}
                    error={errors.fixed_costs?.message}
                  />
                )}
              />
              <CustomTooltip message="Custos Insira o percentual dos custos fixos da sua empresa (ex: aluguel, salários, internet) que deve ser atribuído a este produto." />
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
              <Controller
                name="sales_icms"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="sales_icms"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                    error={errors.sales_icms?.message}
                    disabled={
                      icmsSt > 0 ||
                      isImportedProduct ||
                      isInterstateSale ||
                      (isSimpleNational && !isSixthRevenueRange)
                    }
                  />
                )}
              />
              <CustomTooltip
                message="Informe a alíquota de ICMS que será aplicada na venda deste produto. 
                                        A alíquota pode variar conforme o estado de destino e o regime tributário da sua empresa."
              />
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
              <Controller
                name="sales_pis_cofins"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="sales_pis_cofins"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                    error={errors.sales_pis_cofins?.message}
                    disabled={isSimpleNational}
                  />
                )}
              />
              <CustomTooltip
                message="Digite a alíquota de PIS e COFINS que incidirá sobre a receita da venda. 
                                          O valor varia conforme o regime tributário da sua empresa."
              />
            </Row>
            <Show when={errors.sales_pis_cofins?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.sales_pis_cofins?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Show when={isRealProfit}>
          <Column className="space-y-2">
            <Label htmlFor="irpj_percent" required>
              IRPJ (%)
            </Label>
            <Column className="gap-2">
              <Row className="items-center gap-2">
                <Controller
                  name="irpj_percent"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <SelectInput
                      triggerProps={{
                        id: "irpj_percent",
                      }}
                      placeholder="Selecione o percentual do IRPJ"
                      options={realProfitIrpjPercentOptions}
                      value={value!}
                      onChange={(value) => onChange(Number(value))}
                      className={`${errors.irpj_percent && "border-red-600"}`}
                    />
                  )}
                />
                {/* TO-DO: Atualizar a mensagem desse tooltip */}
                <CustomTooltip message="Selecione o percentual do IRPJ aplicado para este produto." />
              </Row>
              <Show when={errors.irpj_percent?.message}>
                <span className="text-xs text-red-500 -mt-1">
                  {errors.irpj_percent?.message}
                </span>
              </Show>
            </Column>
          </Column>
        </Show>
        <Show when={isPresumedProfit}>
          <Column className="space-y-2">
            <Label htmlFor="irpj_percent" required>
              IRPJ (%){" "}
            </Label>
            <Column className="gap-2">
              <Row className="items-center gap-2">
                <Controller
                  name="irpj_percent"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <SelectInput
                      triggerProps={{
                        id: "irpj_percent",
                      }}
                      placeholder="Selecione o percentual do IRPJ"
                      options={presumedProfitIrpjPercentOptions}
                      value={value!}
                      onChange={(value) => onChange(Number(value))}
                      className={`${errors.irpj_percent && "border-red-600"}`}
                    />
                  )}
                />
                {/* TO-DO: Atualizar a mensagem desse tooltip */}
                <CustomTooltip message="Selecione o percentual do IRPJ aplicado para este produto." />
              </Row>
              <Show when={errors.irpj_percent?.message}>
                <span className="text-xs text-red-500 -mt-1">
                  {errors.irpj_percent?.message}
                </span>
              </Show>
            </Column>
          </Column>
        </Show>
        <Column className="space-y-2">
          <Label htmlFor="shipping">Frete (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="shipping"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="shipping"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                    error={errors.shipping?.message}
                  />
                )}
              />
              <CustomTooltip message="Informe o custo percentual do frete para enviar o produto ao cliente final, caso este custo seja responsabilidade da sua empresa." />
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
              <Controller
                name="other_costs"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="other_costs"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                    error={errors.other_costs?.message}
                  />
                )}
              />
              <CustomTooltip message="Adicione outros custos variáveis ligados à venda, como taxas de marketplace ou custos com embalagem." />
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
            Markup (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="profit"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                  min: { value: 0, message: "Valor mínimo é 0" },
                }}
                render={({ field }) => (
                  <Input
                    id="profit"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                    error={errors.profit?.message}
                  />
                )}
              />
              <CustomTooltip message="Defina sua margem de lucro desejada." />
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

const presumedProfitIrpjPercentOptions = [
  { value: "0", label: "0%" },
  { value: "0.15", label: "15%" },
  { value: "0.25", label: "25%" },
];

const realProfitIrpjPercentOptions = [
  { value: "0", label: "0%" },
  { value: "24", label: "24%" },
  { value: "34", label: "34%" },
];
