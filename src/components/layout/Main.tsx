import { NAVBAR_HEIGHT } from '@/const/layout';
import { Box } from '@mui/material';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        display: 'grid',
        width: '100%',
        marginTop: `${NAVBAR_HEIGHT}px`,
        overflow: 'auto',
        height: `calc(100% - calc(calc(${NAVBAR_HEIGHT} + var(--footer-height, 0)) * 1px))`, // Calculate content height with footer show/hide
        maxWidth: '1280px',
        margin: '20px auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
}
