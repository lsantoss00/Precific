import {
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
