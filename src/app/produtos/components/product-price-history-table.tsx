import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/core/table";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import DateFormatter from "@/src/helpers/date-formatter";
import { ProductHistoryType } from "../types/product-type";

interface ProductPriceHistoryTableProps {
  productPriceHistory: ProductHistoryType[];
}

const ProductPriceHistoryTable = ({
  productPriceHistory,
}: ProductPriceHistoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Preço em 2025</TableHead>
          <TableHead>Preço em 2026</TableHead>
          <TableHead className="text-right">Data de alteração</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productPriceHistory.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              {currencyFormatter(product.price_today)}
            </TableCell>
            <TableCell> {currencyFormatter(product.price_in_2026)}</TableCell>
            <TableCell className="text-right">
              <DateFormatter>{product.changed_at}</DateFormatter>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductPriceHistoryTable;
