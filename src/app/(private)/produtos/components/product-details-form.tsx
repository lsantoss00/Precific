"use client";

import SelectStateInput from "@/src/app/(private)/produtos/components/select-state-input";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import { Checkbox } from "@/src/components/core/checkbox";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const ProductDetailsForm = () => {
  const { form } = useProductForm();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "interstateSale" && !value.interstateSale) {
        form.setValue("importedProduct", false);
        form.setValue("costumerTaxpayer", false);
        form.setValue("stateDestination", undefined);
      }

      if (name === "hasIcmsSt" && value.hasIcmsSt) {
        form.setValue("costumerTaxpayer", false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Card className="w-full p-6 rounded-md flex flex-col space-y-6 flex-1">
      <h3 className="text-lg">Detalhes do Produto</h3>
      <form className="flex flex-col space-y-4">
        <Column className="space-y-2">
          <Label htmlFor="name" required>
            Nome
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite o nome do produto"
            error={errors.name?.message}
            {...register("name", { required: "Nome é obrigatório" })}
          />
          <Show when={errors.name?.message}>
            <span className="text-xs text-red-500 -mt-1">
              {errors.name?.message}
            </span>
          </Show>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="sku" required>
            SKU
          </Label>
          <Input
            id="sku"
            type="text"
            placeholder="Digite o SKU do produto"
            error={errors.sku?.message}
            {...register("sku", { required: "SKU é obrigatório" })}
          />
          <Show when={errors.sku?.message}>
            <span className="text-xs text-red-500 -mt-1">
              {errors.sku?.message}
            </span>
          </Show>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="ncm">NCM</Label>
          <Controller
            name="ncm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MaskedInput
                id="ncm"
                mask="0000.00.00"
                placeholder="0000.00.00"
                value={value || ""}
                onAccept={onChange}
                unmask={true}
              />
            )}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="observations">Observações</Label>
          <Input
            id="observations"
            type="text"
            placeholder="Adicione informações relevantes"
            {...register("observations")}
          />
        </Column>
        <Row className="gap-2 items-center">
          <Controller
            name="hasUserProductPrice"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="hasUserProductPrice"
                checked={Boolean(value)}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="hasUserProductPrice" className="cursor-pointer">
            O seu produto já possui um valor de venda?
          </Label>
        </Row>
        <Show when={Boolean(form.watch("hasUserProductPrice"))}>
          <Column className="gap-2">
            <Label htmlFor="userProductPrice" required>
              Valor (R$)
            </Label>
            <Row className="items-center gap-2">
              <Controller
                name="userProductPrice"
                control={control}
                rules={{
                  validate: (value) => {
                    const hasPrice = form.getValues("hasUserProductPrice");
                    if (
                      hasPrice &&
                      (value === undefined || value === null || value === 0)
                    ) {
                      return "Campo obrigatório";
                    }
                    return true;
                  },
                  min: {
                    value: 0.01,
                    message: "O valor deve ser maior que zero.",
                  },
                }}
                render={({ field }) => {
                  const numericValue = field.value ?? 0;

                  return (
                    <Input
                      id="userProductPrice"
                      placeholder="R$ 0,00"
                      type="numeric"
                      value={currencyFormatter(numericValue * 100)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        const numberValue = Number(raw) / 100;

                        field.onChange(numberValue);
                      }}
                    />
                  );
                }}
              />
            </Row>
            <Show when={errors.userProductPrice?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.userProductPrice?.message}
              </span>
            </Show>
          </Column>
        </Show>
        <Row className="gap-2 items-center">
          <Controller
            name="hasIcmsSt"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="hasIcmsSt"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="hasIcmsSt" className="cursor-pointer">
            A venda incide ICMS ST?
          </Label>
        </Row>
        <Row className="gap-2 items-center">
          <Controller
            name="interstateSale"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="interstateSale"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="interstateSale" className="cursor-pointer">
            A venda é interestadual?
          </Label>
        </Row>
        <Show when={form.watch("interstateSale")}>
          <Controller
            name="stateDestination"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column className="space-y-2">
                <Label htmlFor="stateDestination" required>
                  Estado de destino
                </Label>
                <SelectStateInput
                  id="stateDestination"
                  value={value || ""}
                  placeholder="Selecione o estado de destino"
                  onChange={onChange}
                  error={Boolean(error)}
                />
                <Show when={error}>
                  <span className="text-xs text-red-500 -mt-1">
                    {error?.message}
                  </span>
                </Show>
              </Column>
            )}
          />
        </Show>
        <Row className="gap-2 items-center">
          <Controller
            name="importedProduct"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="importedProduct"
                checked={value}
                onCheckedChange={onChange}
                disabled={
                  !form.watch("interstateSale") ||
                  !form.watch("stateDestination")
                }
              />
            )}
          />
          <Label htmlFor="importedProduct" className="cursor-pointer">
            A venda é de um produto importado?
          </Label>
        </Row>
        <Row className="gap-2 items-center">
          <Controller
            name="costumerTaxpayer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="costumerTaxpayer"
                checked={value}
                onCheckedChange={onChange}
                disabled={
                  !form.watch("interstateSale") ||
                  !form.watch("stateDestination") ||
                  form.watch("hasIcmsSt")
                }
              />
            )}
          />
          <Label htmlFor="costumerTaxpayer" className="cursor-pointer">
            A venda é para um consumidor final que NÃO é contribuinte do ICMS?
          </Label>
        </Row>
      </form>
    </Card>
  );
};

export default ProductDetailsForm;
