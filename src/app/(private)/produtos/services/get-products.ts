import { createClient } from "@/src/libs/supabase/client";
import {
  PaginatedResponseType,
  PaginationType,
} from "@/src/types/pagination-type";
import { ProductResponseType } from "../types/product-type";

interface GetProductsProps extends PaginationType {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "created_at",
  sortOrder = "desc",
}: GetProductsProps): Promise<PaginatedResponseType<ProductResponseType>> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order(sortBy, { ascending: sortOrder === "asc" })
    .order("id", { ascending: false });

  if (search && search.trim()) {
    const searchTerm = search.trim();

    query = query.or(
      `sku.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%,ncm.ilike.%${searchTerm}%`
    );
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data,
    count: totalCount,
    totalPages,
    currentPage: page,
    pageSize,
  };
}
