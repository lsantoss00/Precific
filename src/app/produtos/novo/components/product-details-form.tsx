import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const ProductDetailsForm = () => {
  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
      <h3>Detalhes do Produto</h3>
      <form className="flex flex-col space-y-4">
        <Column className="space-y-2">
          <Label htmlFor="productName">Nome do Produto</Label>
          <Input
            id="productName"
            type="text"
            placeholder="Digite o nome do produto"
          />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="test">Teste</Label>
          <Input id="test" type="number" placeholder="0,00%" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="test2">Teste 2</Label>
          <Input id="test2" type="number" placeholder="0,00%" />
        </Column>
      </form>
    </Card>
  );
};

export default ProductDetailsForm;
