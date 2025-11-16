import { useMemo } from 'react';
import data from '@/features/product-list/mockData/catagory.json';
import type { IAutoCompleteOption } from '@/types/control';

// Note: In the real project, this hook should fetch data from API
function useCategoryOptions() {
  const categoryOptions = useMemo(
    () =>
      data.map(
        (item): IAutoCompleteOption => ({
          value: item.value,
          text: item.name,
        })
      ),
    []
  );

  return categoryOptions;
}
export default useCategoryOptions;
