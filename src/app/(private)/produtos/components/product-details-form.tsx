"use client";

import SelectStateInput from "@/src/app/(private)/produtos/components/select-state-input";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import { Checkbox } from "@/src/components/core/checkbox";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
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
      if (name === "interstate_sale" && !value.interstate_sale) {
        form.setValue("imported_product", false);
        form.setValue("costumer_taxpayer", false);
        form.setValue("state_destination", undefined);
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
            name="has_user_product_price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="has_user_product_price"
                checked={Boolean(value)}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="has_user_product_price" className="cursor-pointer">
            O seu produto já possui um valor de venda?
          </Label>
        </Row>
        <Show when={Boolean(form.watch("has_user_product_price"))}>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="user_product_price"
                control={control}
                render={({ field }) => (
                  <Input
                    id="user_product_price"
                    type="number"
                    placeholder="R$ 0,00"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                  />
                )}
              />
            </Row>
            <Show when={errors.user_product_price?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.user_product_price?.message}
              </span>
            </Show>
          </Column>
        </Show>
        <Row className="gap-2 items-center">
          <Controller
            name="has_icms_st"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="has_icms_st"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="has_icms_st" className="cursor-pointer">
            A venda incide ICMS ST?
          </Label>
        </Row>
        <Row className="gap-2 items-center">
          <Controller
            name="interstate_sale"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="interstate_sale"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="interstate_sale" className="cursor-pointer">
            A venda é interestadual?
          </Label>
        </Row>
        <Show when={form.watch("interstate_sale")}>
          <Controller
            name="state_destination"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column className="space-y-2">
                <Label htmlFor="state_destination" required>
                  Estado de destino
                </Label>
                <SelectStateInput
                  id="state_destination"
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
            name="imported_product"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="imported_product"
                checked={value}
                onCheckedChange={onChange}
                disabled={
                  !form.watch("interstate_sale") ||
                  !form.watch("state_destination")
                }
              />
            )}
          />
          <Label htmlFor="imported_product" className="cursor-pointer">
            A venda é de um produto importado?
          </Label>
        </Row>
        <Row className="gap-2 items-center">
          <Controller
            name="costumer_taxpayer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="costumer_taxpayer"
                checked={value}
                onCheckedChange={onChange}
                disabled={
                  !form.watch("interstate_sale") ||
                  !form.watch("state_destination") ||
                  form.watch("has_icms_st")
                }
              />
            )}
          />
          <Label htmlFor="costumer_taxpayer" className="cursor-pointer">
            A venda é para um consumidor final que NÃO é contribuinte do ICMS?
          </Label>
        </Row>
      </form>
    </Card>
  );
};

export default ProductDetailsForm;
