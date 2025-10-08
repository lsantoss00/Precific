import { supabaseClient } from "@/src/libs/supabase/client";
import {
  PaginatedResponseType,
  PaginationParamsType,
} from "@/src/types/pagination-type";
import { ProductResponseType } from "../types/product-type";

export async function getProducts({
  page = 1,
  pageSize = 10,
}: PaginationParamsType = {}): Promise<
  PaginatedResponseType<ProductResponseType>
> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabaseClient
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

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
