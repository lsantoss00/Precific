import { Button, Input } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { Download, Loader2Icon, Plus, Upload } from "lucide-react";

const ProductsHeaderSection = () => {
  const mockPending = false;

  return (
    <Column className="space-y-3 w-full">
      <Column>
        <h2 className="text-3xl text-black font-bold">Produtos</h2>
      </Column>
      <Flex className="flex-col lg:flex-row max-lg:space-y-4 justify-between lg:items-center w-full">
        <Input
          className="w-full lg:max-w-80 xl:max-w-120"
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
            <span>Novo Produto</span>
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
            <span className="hidden sm:flex"> Exportar CSV</span>
          </Button>
          <Button
            className="hover:cursor-pointer w-fit"
            type="submit"
            disabled={mockPending}
          >
            <Show when={mockPending}>
              <Loader2Icon className="animate-spin" />
            </Show>
            <Upload className="text-white" />
            <span className="hidden sm:flex">Importar CSV</span>
          </Button>
        </Row>
      </Flex>
    </Column>
  );
};

export default ProductsHeaderSection;
