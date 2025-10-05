import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const AcquisitionCostForm = () => {
  return (
    <Card className="h-full w-full p-6 rounded-md flex space-y-6">
      <h3>Custo de Aquisição</h3>
      <form className="grid grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="unitPrice">Preço Unitário NF-e (R$)</Label>
          <Input id="unitPrice" type="number" placeholder="R$ 0,00" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms">ICMS (%)</Label>
          <Input id="icms" type="number" placeholder="0,00" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="pisCofins">PIS/COFINS (%)</Label>
          <Input id="pisCofins" type="number" placeholder="0,00" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icmsSt">ICMS ST (%)</Label>
          <Input id="icmsSt" type="number" placeholder="0,00" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="ipi">IPI (%)</Label>
          <Input id="ipi" type="number" placeholder="0,00" />
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="outros">Outros (%)</Label>
          <Input id="outros" type="number" placeholder="0,00" />
        </Column>
      </form>
      <Column className="bg-gray-200 space-y-2 rounded-md p-4">
        <p className="text-2xl font-bold">R$ 0,00</p>
        <span>Valor final de aquisição</span>
      </Column>
    </Card>
  );
};

export default AcquisitionCostForm;
