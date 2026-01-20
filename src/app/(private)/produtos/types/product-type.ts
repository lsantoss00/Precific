export type ProductType = {
  name: string;
  sku?: string;
  ncm?: string;
  observations?: string;
  unitPrice: number;
  icms: number;
  pisCofins: number;
  icmsSt?: number;
  ipi?: number;
  others?: number;
  fixedCosts?: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping?: number;
  otherCosts?: number;
  profit: number;
  status: "ACTIVE" | "INACTIVE";
  priceToday: number;
  priceIn2026: number;
  priceIn2027?: number;
  irpjPercent: number;
  interstateSale: boolean;
  stateDestination: string | undefined;
  importedProduct: boolean;
  costumerTaxpayer: boolean;
  mva?: number;
  hasIcmsSt: boolean;
  hasUserProductPrice: boolean;
  userProductPrice?: number;
};

export type ProductFormDataType = Omit<
  ProductType,
  "priceToday" | "priceIn2026" | "priceIn2027"
>;

export type ProductResponseType = ProductType & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductRequestType = Partial<ProductType> & {
  id: string;
};

export type ProductSummariesResponseType = {
  registeredProducts: number;
  precifiedProducts: number;
  activeProducts: number;
  inactiveProducts: number;
};

export type ProductExportType = Pick<
  ProductResponseType,
  | "sku"
  | "name"
  | "ncm"
  | "priceToday"
  | "priceIn2026"
  | "priceIn2027"
  | "status"
>;

export type ProductHistoryTableType = {
  id: string;
  priceToday: number;
  priceIn2026: number;
  changedAt: string;
};

export type ProductToImportType = {
  sku: string | null;
  name: string | null;
  ncm: string | null;
  priceToday: number;
  priceIn2026: number;
  priceIn2027: number;
  status: string;
};
