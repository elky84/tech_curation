
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from 'react';
import MenuDrawer from '../Drawer/Drawer';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "primary.main" }}>
                Tech Curation
              </Typography>
            </Box>
            {["/", "/about", "/articles", "/chat", "/feeds", "/community"].map((path, index) => (
                <Button key={index} color="inherit"  component={RouterLink} to={path} sx={{ color: "primary.main" }}>
                    {["홈", "서비스 소개", "트렌드", "채팅", "피드","커뮤니티"][index]}
                </Button>
            ))}
          </Toolbar>
        </Container>
      </AppBar>

      <MenuDrawer open={drawerOpen} onClose={toggleDrawer} />
    </>
  );
}
  
export default Header;