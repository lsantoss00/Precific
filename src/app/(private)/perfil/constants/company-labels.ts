import {
  RevenueRangeType,
  SectorType,
  TaxRegimeType,
} from "@/src/app/(private)/perfil/types/company-type";

export const SECTOR_LABELS: Record<SectorType, string> = {
  business: "Comércio",
  industry: "Indústria",
};

export const TAX_REGIME_LABELS: Record<TaxRegimeType, string> = {
  real_profit: "Lucro Real",
  presumed_profit: "Lucro Presumido",
  simple_national: "Simples Nacional",
};

export const REVENUE_RANGE_LABELS: Record<RevenueRangeType, string> = {
  range_1: "R$0,00 - R$180.000,00",
  range_2: "R$180.000,01 - R$360.000,00",
  range_3: "R$360.000,01 - R$720.000,00",
  range_4: "R$720.000,01 - R$1.800.000,00",
  range_5: "R$1.800.000,01 - R$3.600.000,00",
  range_6: "R$3.600.000,01 - R$4.800.000,00",
};
