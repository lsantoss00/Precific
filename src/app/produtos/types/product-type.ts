export type ProductType = {
  name: string;
  sku?: string;
  ncm?: string;
  observations?: string;
  unit_price: number;
  icms: number;
  pis_cofins: number;
  icms_st?: number;
  ipi?: number;
  others?: number;
  fixed_costs?: number;
  sales_icms: number;
  sales_pis_cofins: number;
  shipping?: number;
  other_costs?: number;
  profit: number;
  // TO-DO: os campos abaixo deve ser obrigatório depois
  price_today?: number;
  price_in_2026?: number;
  price_in_2027?: number;
};

export type ProductResponseType = ProductType & {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type ProductFormDataType = Omit<
  ProductType,
  "price_today" | "price_in_2026" | "price_in_2027"
>;

export type ProductRequestType = Partial<ProductType> & {
  id: string;
};
