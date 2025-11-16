import { EModalMode, ESortOrder } from '@/enums/control';
import useFetchProductList from '@/features/product-list/api/useFetchProductList';
import ProductList from '@/features/product-list/components/ProductList';
import ProductListFilter from '@/features/product-list/components/ProductListFilter';
import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import type {
  IProductListFilter,
  ProductListItemResponse,
} from '@/features/product-list/types';
import { type GridSortModel } from '@mui/x-data-grid';
import ProductDetailModal from '@/features/product-list/components/ProductDetailModal';
import useToggle from '@/hooks/useToggle';

const DEFAULT_PRODUCT_FILTER_STATE: IProductListFilter = {
  catagories: [],
  isInstock: true,
  name: '',
  sortBy: {
    field: 'updatedAt',
    order: ESortOrder.ASC,
  },
};

function ProductListPage() {
  const [filter, setFilter] = useState<IProductListFilter>(
    DEFAULT_PRODUCT_FILTER_STATE
  );

  const [selectedProduct, setSelectedProduct] =
    useState<ProductListItemResponse | null>(null);
  const [modalMode, setModalMode] = useState<EModalMode>(EModalMode.VIEW);

  const toggleProductDetailModal = useToggle(false);

  const productList = useFetchProductList({
    filter,
  });

  const handleSubmitSearch = useCallback(
    (data: Partial<IProductListFilter>) => {
      setFilter((prev) => ({
        sortBy: prev.sortBy,
        catagories: data.catagories ?? [],
        name: data.name ?? '',
        isInstock: data.isInstock ?? true,
      }));
    },
    [setFilter]
  );

  const handleReset = useCallback(() => {
    setFilter(DEFAULT_PRODUCT_FILTER_STATE);
  }, [setFilter]);

  const handleSortModelChange = useCallback(
    (model: GridSortModel) => {
      if (model.length === 0) {
        setFilter((prev: IProductListFilter) => ({
          ...prev,
          sortBy: {
            field: 'updatedAt',
            order: ESortOrder.ASC,
          },
        }));
        return;
      }
      setFilter((prev) => ({
        ...prev,
        sortBy: {
          field: model[0].field,
          order: model[0].sort === 'asc' ? ESortOrder.ASC : ESortOrder.DESC,
        },
      }));
    },
    [setFilter]
  );

  const handleEdit = useCallback(
    (row: ProductListItemResponse) => {
      setSelectedProduct(row);
      setModalMode(EModalMode.EDIT);
      toggleProductDetailModal.open();
    },
    [toggleProductDetailModal]
  );

  const handleView = useCallback(
    (row: ProductListItemResponse) => {
      setSelectedProduct(row);
      setModalMode(EModalMode.VIEW);
      toggleProductDetailModal.open();
    },
    [toggleProductDetailModal]
  );

  const handleDelete = useCallback((row: ProductListItemResponse) => {
    alert(`Delete ${row.name}`);
  }, []);

  const handleSubmitProductDetail = useCallback(
    (product: ProductListItemResponse) => {
      alert(`Update: ${JSON.stringify(product, null, 2)}`);
      toggleProductDetailModal.close();
    },
    [toggleProductDetailModal]
  );

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <ProductListFilter
          defaultFilter={DEFAULT_PRODUCT_FILTER_STATE}
          onSubmit={handleSubmitSearch}
          onReset={handleReset}
        />
        <ProductList
          data={productList}
          onSortModelChange={handleSortModelChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
      <ProductDetailModal
        open={toggleProductDetailModal.value}
        onClose={() => {
          toggleProductDetailModal.close();
          setSelectedProduct(null);
          setModalMode(EModalMode.VIEW);
        }}
        onSubmit={handleSubmitProductDetail}
        mode={modalMode}
        product={selectedProduct}
      />
    </>
  );
}

export default ProductListPage;
