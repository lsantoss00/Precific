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
  company_name: string;
  cnpj: string;
  sector: SectorType;
  tax_regime: TaxRegimeType;
  revenue_range?: RevenueRangeType;
  state: string;
  postal_code: string;
  street_address: string;
  street_number: string;
  address_complement?: string;
}
