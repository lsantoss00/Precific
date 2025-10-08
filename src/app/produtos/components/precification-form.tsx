import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const PrecificationForm = () => {
  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
      <h3>Precificação</h3>
      <form className="grid grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="fixedCosts">Custos Fixos (%)</Label>
          <Input id="fixedCosts" type="number" placeholder="0,00%" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms" required>
            ICMS Venda (%)
          </Label>
          <Input id="icms" type="number" placeholder="0,00%" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="pisCofinsSell" required>
            PIS/COFINS Venda (%)
          </Label>
          <Input id="pisCofinsSell" type="number" placeholder="0,00%" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="freight">Frete (%)</Label>
          <Input id="freight" type="number" placeholder="0,00%" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="otherCosts">Outros Custos (%)</Label>
          <Input id="otherCosts" type="number" placeholder="0,00%" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="profitMargin" required>
            Margem de Lucro (%)
          </Label>
          <Input id="profitMargin" type="number" placeholder="0,00%" />
        </Column>
      </form>
    </Card>
  );
};

export default PrecificationForm;
