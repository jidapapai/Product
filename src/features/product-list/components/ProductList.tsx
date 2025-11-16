import { Box } from '@mui/material';
import { DataGrid, type GridSortModel } from '@mui/x-data-grid';
import type { ProductListItemResponse } from '@/features/product-list/types';
import { ProductListColumns } from '@/features/product-list/columns/ProductListColumn';
import { DEFAULT_PAGE_SIZE } from '@/const/control';
import { useState } from 'react';

interface IProductListProps {
  data: ProductListItemResponse[];
  onSortModelChange: (model: GridSortModel) => void;
  onView: (row: ProductListItemResponse) => void;
  onEdit: (row: ProductListItemResponse) => void;
  onDelete: (row: ProductListItemResponse) => void;
}

function ProductList({
  data,
  onSortModelChange,
  onView,
  onEdit,
  onDelete,
}: IProductListProps) {
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        data-testid="product-list"
        rows={data}
        columns={ProductListColumns({
          onView,
          onEdit,
          onDelete,
        })}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: DEFAULT_PAGE_SIZE,
            },
          },
        }}
        sortModel={sortModel}
        onSortModelChange={(newModel) => {
          setSortModel(newModel);
          onSortModelChange(newModel);
        }}
        disableColumnMenu
        disableColumnFilter
        disableMultipleRowSelection={true}
        disableRowSelectionOnClick={true}
      />
    </Box>
  );
}

export default ProductList;
