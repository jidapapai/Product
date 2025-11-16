import { type GridColDef } from '@mui/x-data-grid';
import type { ProductListItemResponse } from '@/features/product-list/types';
import { mappingCategoryLabel } from '@/features/product-list/utils';
import { formatFromUtcToLocalDateTime } from '@/utils/datetime';
import { formatDisplayCurrency } from '@/utils/numeral';
import { Box, Button, Link } from '@mui/material';

interface IProductListColumnProps {
  onView?: (row: ProductListItemResponse) => void;
  onEdit?: (row: ProductListItemResponse) => void;
  onDelete?: (row: ProductListItemResponse) => void;
}

export const ProductListColumns = ({
  onView,
  onEdit,
  onDelete,
}: IProductListColumnProps): GridColDef<ProductListItemResponse>[] => {
  return [
    {
      field: 'no',
      headerName: 'No.',
      sortable: false,
      width: 60,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'updatedAt',
      headerName: 'Updated datetime',
      sortable: true,
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        return formatFromUtcToLocalDateTime(row.updatedAt);
      },
    },
    {
      field: 'name',
      headerName: 'Product name',
      sortable: false,
      width: 250,
      renderCell: ({ row }) => {
        return (
          <Link
            data-testid="product-name"
            sx={{ cursor: 'pointer' }}
            onClick={() => onView?.(row)}
          >
            {row.name}
          </Link>
        );
      },
    },
    {
      field: 'category',
      headerName: 'Catagory',
      sortable: false,
      width: 180,
      renderCell: ({ row }) => {
        return mappingCategoryLabel(row.category);
      },
    },

    {
      field: 'price',
      headerName: 'Price',
      sortable: true,
      width: 100,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ row }) => {
        return formatDisplayCurrency(row.price);
      },
    },
    {
      field: 'isInstock',
      headerName: 'Status',
      sortable: false,
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        return row.isInstock ? 'In Stock' : 'Out of Stock';
      },
    },
    // {
    //   field: 'image',
    //   headerName: 'Image',
    //   sortable: false,
    //   width: 150,
    //   renderCell: ({ row }) => {
    //     console.log(row.image);
    //     return (
    //       <Box sx={{ width: 100, height: 100 }}>
    //         <img src={row.image} alt={row.name} />
    //       </Box>
    //     );
    //   },
    // },
    {
      headerName: '',
      field: 'Action',
      sortable: false,
      width: 200,
      type: 'actions',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              data-testid="edit-product-button"
              variant="contained"
              color="primary"
              onClick={() => {
                onEdit?.(row);
              }}
            >
              Edit
            </Button>
            <Button
              data-testid="delete-product-button"
              variant="contained"
              color="error"
              onClick={() => {
                onDelete?.(row);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];
};
