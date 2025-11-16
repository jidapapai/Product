import {
  Modal,
  Box,
  Card,
  TextField,
  CardContent,
  CardHeader,
  MenuItem,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import { EModalMode } from '@/enums/control';
import type { ProductListItemResponse } from '@/features/product-list/types';
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import theme from '@/lib/mui-theme';
import useCategoryOptions from '@/features/product-list/hooks/useCategoryOptions';
import BaseSelect from '@/components/base/BaseSelect/BaseSelect';
import type { EProductCategory } from '@/enums/product';
import BaseCheckBoxSingle from '@/components/base/BaseCheckbox/BaseCheckboxSingle';

interface IProductDetailModalProps {
  product: ProductListItemResponse | null;
  open: boolean;
  mode: EModalMode;
  onClose: () => void;
  onSubmit: (product: ProductListItemResponse) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: theme.palette.background.paper,
  boxShadow: 24,
};

function ProductDetailModal({
  open,
  mode,
  product,
  onClose,
  onSubmit,
}: IProductDetailModalProps) {
  const [productDetail, setProductDetail] =
    useState<ProductListItemResponse | null>(null);

  const categoryOptions = useCategoryOptions();

  const title = useMemo(() => {
    if (!product) {
      return '';
    }
    if (mode === EModalMode.VIEW) {
      return `${product.name}`;
    }
    return `Edit ${product.name}`;
  }, [mode, product]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    if (fieldName === 'productName') {
      setProductDetail((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          name: e.target.value,
        };
      });
    }

    if (fieldName === 'description') {
      setProductDetail((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          description: e.target.value,
        };
      });
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!productDetail) return;
      onSubmit?.(productDetail);
    },
    [productDetail, onSubmit]
  );

  useEffect(() => {
    startTransition(() => {
      if (!product) {
        setProductDetail(null);
      } else {
        setProductDetail(product);
      }
    });
  }, [product]);

  return (
    <Modal data-testid="product-detail-modal" open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ width: '100%' }}>
            <CardHeader title={<Typography variant="h6">{title}</Typography>} />
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '200px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  style={{ width: '', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  src={productDetail?.image || ''}
                  alt={productDetail?.name || ''}
                />
              </Box>
              <TextField
                label="Product Name"
                name="productName"
                variant="outlined"
                value={productDetail?.name || ''}
                disabled={mode === EModalMode.VIEW}
                onChange={handleChange}
              />
              <BaseSelect
                labelId="category-label"
                id="category-select"
                value={productDetail?.category || ''}
                label="Category"
                disabled={mode === EModalMode.VIEW}
                name="category"
                onChange={(e) => {
                  if (!productDetail) {
                    return;
                  }
                  setProductDetail({
                    ...productDetail,
                    category: e.target.value as EProductCategory,
                  });
                }}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </BaseSelect>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={productDetail?.description || ''}
                disabled={mode === EModalMode.VIEW}
                multiline
                rows={4}
                onChange={handleChange}
              />
              <BaseCheckBoxSingle
                label="In Stock"
                name="isInstock"
                disabled={mode === EModalMode.VIEW}
                checked={productDetail?.isInstock || false}
                onChange={(e) => {
                  if (!productDetail) {
                    return;
                  }
                  setProductDetail({
                    ...productDetail,
                    isInstock: e.target.checked,
                  });
                }}
              />
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                marginBlock: '10px',
              }}
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
}

export default ProductDetailModal;
