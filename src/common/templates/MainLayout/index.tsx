import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import ScrollOnClick from '../../atoms/ScrollOnClick';
import HideOnScroll from '../../atoms/HideOnScroll';
import ContentContainer from '../../atoms/ContentContainer';
import Sidebar from './Sidebar';

export interface MainLayoutProps {
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = React.useCallback(() => {
    setDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar variant="dense">
            <Grid container alignItems="center" spacing={0}>
              <Grid item xs={2}>
                <IconButton edge="start" color="inherit" size="small" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h1" align="center" component="h1">
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar variant="dense" id="back-to-top-anchor" />
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiPaper-root': { width: 200 },
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true,
        }}
      >
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="small" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Sidebar />
      </Drawer>
      <ContentContainer>
        <>{children}</>
      </ContentContainer>
      <ScrollOnClick anchorSelector="#back-to-top-anchor">
        <Fab color="inherit" size="small" sx={{ backgroundColor: 'transparent' }}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollOnClick>
    </>
  );
};

export default MainLayout;
