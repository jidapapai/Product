import BaseCheckBoxSingle from '@/components/base/BaseCheckbox/BaseCheckboxSingle';
import type { IAutoCompleteOption } from '@/types/control';
import { Autocomplete, Button, TextField } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import useCategoryOptions from '@/features/product-list/hooks/useCategoryOptions';
import type { IProductListFilter } from '@/features/product-list/types';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
  },
}));

interface IProductListFilterProps {
  defaultFilter: IProductListFilter;
  onSubmit: (data: Partial<IProductListFilter>) => void;
  onReset: () => void;
}

function ProductListFilter({
  defaultFilter,
  onSubmit,
  onReset,
}: IProductListFilterProps) {
  const [searchProductName, setSearchProductName] = useState('');
  const [isInStock, setIsInStock] = useState(defaultFilter.isInstock);
  const [selectedCatagory, setSelectedCatagory] = useState<
    IAutoCompleteOption[]
  >([]);

  const categoryOptions = useCategoryOptions();

  const handleSearchProductNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchProductName(e.target.value);
    },
    []
  );

  const handleCatagoryChange = useCallback(
    (
      _event: React.SyntheticEvent<Element, Event>,
      value: IAutoCompleteOption[]
    ) => {
      setSelectedCatagory(value);
    },
    []
  );

  const handleReset = useCallback(() => {
    setSearchProductName('');
    setIsInStock(defaultFilter.isInstock);
    setSelectedCatagory([]);
    onReset();
  }, [defaultFilter.isInstock, onReset]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({
        catagories: selectedCatagory.map((item) => item.value),
        isInstock: isInStock,
        name: searchProductName,
      });
    },
    [isInStock, onSubmit, searchProductName, selectedCatagory]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h1">Product Catagory</Typography>
        <Box className="search-container">
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
              },
            }}
          >
            <TextField
              label="Product Name"
              variant="outlined"
              name="search-product-name"
              sx={{ width: '100%' }}
              value={searchProductName}
              onChange={handleSearchProductNameChange}
            />
            <Autocomplete
              multiple
              data-testid="catagory-filter"
              options={categoryOptions}
              getOptionLabel={(option) => option.text}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Catagory"
                  placeholder="Select"
                  name="catagory-filter"
                  sx={{ width: '100%' }}
                />
              )}
              value={selectedCatagory}
              onChange={handleCatagoryChange}
            />
          </Box>
          <BaseCheckBoxSingle
            label="In Stock"
            onChange={(e) => {
              setIsInStock(e.target.checked);
            }}
            checked={isInStock}
          />
          <Box
            sx={{
              display: 'grid',
              justifyContent: 'space-between',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 30%',
              },
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: {
                  xs: 'grid',
                  sm: 'flex',
                },
                gridTemplateColumns: {
                  xs: '1fr 1fr',
                },
                gap: 2,
              }}
            >
              <StyledButton type="submit" variant="contained">
                Search
              </StyledButton>
              <StyledButton onClick={handleReset} variant="outlined">
                Reset
              </StyledButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledButton onClick={handleReset} variant="contained">
                Add
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default ProductListFilter;
