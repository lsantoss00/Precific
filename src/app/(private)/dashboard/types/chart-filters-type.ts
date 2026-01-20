// TO-DO: Talvez esse type não seja necessário,
// a ideia era que ele fosse universal,
// mas apenas para gráficos com range de tempo seria útil

export type ChartFiltersType = {
  fromDate?: Date;
  toDate?: Date;
  productIds: string[];
};
