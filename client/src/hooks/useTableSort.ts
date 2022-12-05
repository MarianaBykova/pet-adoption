import { useState } from 'react';
import { TPetType } from '../types/types';

type TOrder = 'asc' | 'desc';

export default function useTableSort<T>(items: TPetType[]) {
  console.log('items', items)
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof TPetType>('age');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TPetType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    console.log('property', property)
    setOrderBy(property);
  };

  function stableSort<T>(array: readonly TPetType[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  function getComparator<Key extends keyof any>(
    order: TOrder,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    console.log('orderBy', orderBy)
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const sortedItems = stableSort(items, getComparator(order, orderBy));

  return { sortedItems, order, orderBy, handleRequestSort };
}
