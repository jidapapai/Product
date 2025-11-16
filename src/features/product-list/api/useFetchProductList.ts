import type { EProductCategory } from '@/enums/product';
import data from '@/features/product-list/mockData/list.json';
import type { ProductListItemResponse } from '@/features/product-list/types';
import { useMemo } from 'react';
import type { IProductListFilter } from '@/features/product-list/types';
import { sortBy } from 'lodash';

function useFetchProductList({
  filter,
}: {
  filter: IProductListFilter;
}): ProductListItemResponse[] {
  const result = useMemo(() => {
    const cloneData = [...data];

    const filteredData = cloneData.filter((item) => {
      let isMatch = true;
      if (
        filter.name &&
        !item.name.toLowerCase().includes(filter.name.toLowerCase())
      ) {
        isMatch = false;
      }

      if (filter.catagories.length > 0) {
        if (!filter.catagories.includes(item.category)) {
          isMatch = false;
        }
      }

      if (filter.isInstock !== item.isInstock) {
        isMatch = false;
      }

      return isMatch;
    });

    const { field, order } = filter.sortBy;
    const result = sortBy(filteredData, field, order).map(
      (item, index): ProductListItemResponse => {
        return {
          id: item.id,
          no: index + 1,
          isInstock: item.isInstock,
          updatedAt: item.updatedAt,
          category: item.category as EProductCategory,
          name: item.name,
          price: item.price,
          createdAt: item.createAt,
          image: item.image,
          description: item.description,
        };
      }
    );
    return result;
  }, [filter]);
  return result;
}

export default useFetchProductList;
