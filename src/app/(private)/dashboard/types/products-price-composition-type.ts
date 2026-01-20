export type ProductPriceCompositionType = {
  productId: string;
  productName: string;
  metrics?: {
    fixedCosts: number;
    icms: number;
    icmsSt: number;
    ipi: number;
    irpjPercent: number;
    mva: number;
    otherCosts: number;
    others: number;
    pisCofins: number;
    priceIn2026: number;
    priceIn2027: number;
    priceToday: number;
    profit: number;
    salesIcms: number;
    salesPisCofins: number;
    shipping: number;
    unitPrice: number;
    userProductPrice: number;
  };
};
