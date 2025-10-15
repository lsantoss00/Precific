import { supabaseClient } from "@/src/libs/supabase/client";
import {
  PaginatedResponseType,
  PaginationType,
} from "@/src/types/pagination-type";
import { ProductResponseType } from "../types/product-type";

interface GetProductsProps extends PaginationType {
  search?: string;
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  search = "",
}: GetProductsProps): Promise<PaginatedResponseType<ProductResponseType>> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseClient
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: true });

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
    data: data,
    count: totalCount,
    totalPages,
    currentPage: page,
    pageSize,
  };
}
