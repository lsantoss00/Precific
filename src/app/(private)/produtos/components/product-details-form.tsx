"use client";

import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import Show from "@/src/components/core/show";
import { Controller } from "react-hook-form";

const ProductDetailsForm = () => {
  const { form } = useProductForm();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <Card className="w-full p-6 rounded-md flex space-y-6">
      <h3>Detalhes do Produto</h3>
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
      </form>
    </Card>
  );
};

export default ProductDetailsForm;
