import { NAVBAR_HEIGHT } from '@/const/layout';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={[
          {
            height: NAVBAR_HEIGHT,
          },
        ]}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Navbar
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
