import { createTheme } from '@mui/material';
import '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'inherit', // Set a default font family
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        },
      },
    },
  },
});

export default theme;
