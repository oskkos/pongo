import { useEffect, useState } from 'react';

import type { JSX, SetStateAction } from 'react';

export interface SortType<T extends string> {
  property: T;
  direction: 'asc' | 'desc';
}

function _updateSort<T extends string>(
  property: SortType<T>['property'],
  setSort: (value: SetStateAction<SortType<T>>) => void
) {
  setSort((prev) => {
    if (prev.property === property) {
      return { property, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    }
    return { property, direction: 'asc' };
  });
}

function sortData<T extends object, U extends string>(
  data: T[],
  sort: SortType<U>,
  getters?: Map<U, (data: T) => string>
) {
  data.sort((a, b) => {
    const property = sort.property;
    const aValue = (getters?.has(property) ? getters.get(property)?.(a) : a[property as unknown as keyof T]) ?? '';
    const bValue = (getters?.has(property) ? getters.get(property)?.(b) : b[property as unknown as keyof T]) ?? '';

    if (aValue < bValue) {
      return sort.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function _sortIcon<T extends string>(column: string, sort: SortType<T>) {
  if (sort.property === column) {
    return sort.direction === 'asc' ? <span className="ml-2">▲</span> : <span className="ml-2">▼</span>;
  }
  return null;
}

export function useSort<T extends object, U extends string>(
  initialSort: SortType<U>,
  data: T[],
  getters?: Map<U, (data: T) => string>
) {
  const [sort, setSort] = useState(initialSort);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    sortData(data, sort, getters);
    setSortedData([...data]);
  }, [sort, data, getters]);

  const updateSort: (property: SortType<U>['property']) => void = (property) => _updateSort(property, setSort);
  const sortIcon: (column: U) => JSX.Element | null = (column) => _sortIcon(column, sort);
  return { updateSort, sortedData, sortIcon };
}
