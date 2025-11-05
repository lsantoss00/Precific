export type SectorType = "business" | "industry";
export type TaxRegimeType = "realProfit" | "presumedProfit" | "simpleNational";
export type RevenueRangeType =
  | "range-1"
  | "range-2"
  | "range-3"
  | "range-4"
  | "range-5"
  | "range-6";

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
}
