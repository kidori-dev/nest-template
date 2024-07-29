import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResultType } from './types/infinity-pagination-result.type';

export const infinityPagination = <T>(
  data: any,
  options: IPaginationOptions,
  sort: string = 'desc',
): InfinityPaginationResultType<T> => {
  const totalCount = data[1];
  const list = data[0];

  let lastPage = Math.ceil(totalCount / options.limit);
  if (lastPage < 1) {
    lastPage = 1;
  }

  if (sort === 'asc') {
    let startNumber =
      options.page === 1
        ? options.page
        : (options.page - 1) * options.limit + 1;
    for (const item of list) {
      item.seq = startNumber;
      startNumber++;
    }
  } else {
    let startNumber =
      options.page === 1 ? 0 : (options.page - 1) * options.limit;
    startNumber = totalCount - startNumber;
    if (list.length < options.limit) {
      startNumber = list.length;
    }
    for (const item of list) {
      item.seq = startNumber;
      startNumber--;
    }
  }

  return {
    data: list,
    totalCount,
    currentPage: options.page,
    lastPage: lastPage,
    hasNextPage: list.length === options.limit,
  };
};
