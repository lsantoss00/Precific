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
  status: "ACTIVE" | "INACTIVE";
  price_today: number;
  price_in_2026: number;
  price_in_2027?: number;
  irpj_percent: number;
  interstate_sale: boolean;
  state_destination: string | undefined;
  imported_product: boolean;
  costumer_taxpayer: boolean;
  mva?: number;
  has_icms_st: boolean;
  has_user_product_price: boolean;
  user_product_price?: number;
};

export type ProductFormDataType = Omit<
  ProductType,
  "price_today" | "price_in_2026" | "price_in_2027"
>;

export type ProductResponseType = ProductType & {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type ProductRequestType = Partial<ProductType> & {
  id: string;
};

export type ProductSummariesResponseType = {
  registered_products: number;
  precified_products: number;
  active_products: number;
  inactive_products: number;
};

export type ProductExportType = Pick<
  ProductResponseType,
  | "sku"
  | "name"
  | "ncm"
  | "price_today"
  | "price_in_2026"
  | "price_in_2027"
  | "status"
>;

export type ProductHistoryType = {
  id: string;
  price_today: number;
  price_in_2026: number;
  changed_at: string;
};
