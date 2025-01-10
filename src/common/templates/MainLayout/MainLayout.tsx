import { type ReactNode, useCallback, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import ContentContainer from '../../atoms/ContentContainer';
import HideOnScroll from '../../atoms/HideOnScroll/HideOnScroll';
import ScrollOnClick from '../../atoms/ScrollOnClick/ScrollOnClick';
import Typography from '../../atoms/Typography/Typography';
import Sidebar from './Sidebar/Sidebar';

export interface MainLayoutProps {
  title: string;
  children: ReactNode;
}

export default function MainLayout({ title, children }: MainLayoutProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar variant="dense" sx={{ position: 'relative' }}>
            <IconButton
              edge="start"
              color="inherit"
              size="small"
              onClick={handleDrawerToggle}
              sx={{ position: 'absolute', left: 16, lineHeight: 48 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h1"
              align="center"
              component="h1"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
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
        <Toolbar
          variant="dense"
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <IconButton size="small" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Sidebar />
      </Drawer>
      <ContentContainer>{children}</ContentContainer>
      <ScrollOnClick anchorSelector="#back-to-top-anchor">
        <Fab
          color="inherit"
          size="small"
          sx={{ backgroundColor: 'transparent' }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollOnClick>
    </>
  );
}
