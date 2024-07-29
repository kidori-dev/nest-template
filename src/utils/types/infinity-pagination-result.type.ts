export type InfinityPaginationResultType<T> = Readonly<{
  data: T;
  totalCount: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}>;
