import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <List>
          <ListItemButton onClick={onClose}>
            <ListItemText primary="메뉴 항목 1" />
          </ListItemButton>
          <ListItemButton onClick={onClose}>
            <ListItemText primary="메뉴 항목 2" />
          </ListItemButton>
          <ListItemButton onClick={onClose}>
            <ListItemText primary="메뉴 항목 3" />
          </ListItemButton>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default MenuDrawer;
