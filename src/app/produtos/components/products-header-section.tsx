import { Button, Input } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { Download, Loader2Icon, Plus } from "lucide-react";

const ProductsHeaderSection = () => {
  const mockPending = false;

  return (
    <Column className="space-y-3 w-full">
      <Column>
        <h2 className="text-3xl text-black font-bold">Produtos</h2>
      </Column>
      <Row className="justify-between items-center">
        <Input
          className="w-full max-w-120"
          placeholder="Buscar por SKU, Nome ou NCM"
        />
        <Row className="space-x-2">
          <Button
            className="hover:cursor-pointer w-fit"
            type="submit"
            variant="secondary"
            disabled={mockPending}
          >
            <Show when={mockPending}>
              <Loader2Icon className="animate-spin" />
            </Show>
            <Plus className="text-white" />
            Novo Produto
          </Button>
          <Button
            className="hover:cursor-pointer w-fit"
            type="submit"
            disabled={mockPending}
          >
            <Show when={mockPending}>
              <Loader2Icon className="animate-spin" />
            </Show>
            <Download className="text-white" />
            Exportar CSV
          </Button>
          <Button
            className="hover:cursor-pointer w-fit"
            type="submit"
            disabled={mockPending}
          >
            <Show when={mockPending}>
              <Loader2Icon className="animate-spin" />
            </Show>
            <Download className="text-white" />
            Importar CSV
          </Button>
        </Row>
      </Row>
    </Column>
  );
};

export default ProductsHeaderSection;
