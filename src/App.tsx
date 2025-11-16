import { Box } from '@mui/material';
import ProductListPage from '@/pages/ProductListPage';
import Navbar from '@/components/layout/Navbar';
import Main from '@/components/layout/Main';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Main>
        {/* Handle router here */}
        <ProductListPage />
      </Main>
    </Box>
  );
}

export default App;
