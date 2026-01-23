import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/core/table";

import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { dateFormatter } from "@/src/helpers/date-formatter";
import { ProductHistoryTableType } from "../types/product-type";

interface ProductPriceHistoryTableProps {
  productPriceHistory: ProductHistoryTableType[];
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
              {currencyFormatter(product.priceToday)}
            </TableCell>
            <TableCell> {currencyFormatter(product.priceIn2026)}</TableCell>
            <TableCell className="text-right">
              {dateFormatter(product.changedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductPriceHistoryTable;
