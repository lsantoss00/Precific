import { Button, Input } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { Download, Loader2Icon, Plus } from "lucide-react";

const ProductsHeaderSection = () => {
  const mockPending = false;

  return (
    <Column className="space-y-5 w-full max-w-5xl">
      <Column>
        <h2 className="text-3xl text-white font-bold">Produtos</h2>
        <h3 className="text-lg text-white font-light">
          Gerencie seus produtos e PRECIFIC!
        </h3>
      </Column>
      <Row className="justify-between">
        <Input
          className="w-full max-w-90"
          placeholder="Buscar por SKU, Nome ou NCM"
        />
        <Row className="space-x-2">
          <Button
            className="hover:cursor-pointer w-fit"
            type="submit"
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
