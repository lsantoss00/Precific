"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const ProductDetailsForm = () => {
  const { form } = useProductForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
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
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            type="text"
            placeholder="Digite o SKU do produto"
            {...register("sku")}
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="ncm">NCM</Label>
          <Input
            id="ncm"
            type="text"
            placeholder="0000.00.00"
            {...register("ncm")}
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
