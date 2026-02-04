export type SectorType = "business" | "industry";

export type TaxRegimeType =
  | "real_profit"
  | "presumed_profit"
  | "simple_national";

export type RevenueRangeType =
  | "range_1"
  | "range_2"
  | "range_3"
  | "range_4"
  | "range_5"
  | "range_6";

export interface CompanyType {
  companyName: string;
  cnpj: string;
  sector: SectorType;
  taxRegime: TaxRegimeType;
  revenueRange?: RevenueRangeType;
  state: string;
  postalCode: string;
  streetAddress: string;
  streetNumber: string;
  addressComplement?: string;
  productsQuantity: number;
  pricedProductsQuantity?: number;
}
