import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/core/table";

import { ProductResponseType } from "../types/product-type";

interface ProductDetailsTableProps {
  product: Partial<ProductResponseType>;
}

const ProductDetailsTable = ({ product }: ProductDetailsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campo</TableHead>
          <TableHead>Preço Pré Precific</TableHead>
          <TableHead className="text-right">Preço Pós Precific</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
};

export default ProductDetailsTable;
