
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

const Header = () => {

  return (
    <>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "primary.main" }}>
                Tech Curation
              </Typography>
            </Box>
            {["/","/articles", "/feeds"].map((path, index) => (
                <Button key={index} color="inherit"  component={RouterLink} to={path} sx={{ color: "primary.main" }}>
                    {["홈", "추천 글", "피드"][index]}
                </Button>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
  
export default Header;