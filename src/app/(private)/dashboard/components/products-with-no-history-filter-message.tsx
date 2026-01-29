import { pluralize } from "@/src/helpers/pluralize";

interface ProductsWithNoHistoryFilterMessageProps {
  products: number;
}

const ProductsWithNoHistoryFilterMessage = ({
  products,
}: ProductsWithNoHistoryFilterMessageProps) => {
  const message = pluralize(
    products,
    "O produto selecionado não possui histórico.",
    "Nenhum dos produtos selecionados possuem histórico.",
  );

  return (
    <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
      <p className="text-sm text-muted-foreground text-center">{message}</p>
    </div>
  );
};

export default ProductsWithNoHistoryFilterMessage;
