export interface PaginationType {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponseType<T> {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginationMetadataType {
  count: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
