import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import { ScrollOnClick } from '../../atoms/ScrollOnClick';
import { HideOnScroll } from '../../atoms/HideOnScroll';
import { Container } from '../../atoms/Container';
import { Sidebar } from './Sidebar';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: 200,
    },
    drawerToolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    topBtn: {
      backgroundColor: 'transparent',
    },
  }),
);

export interface MainLayoutProps {
  title: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };
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
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true,
        }}
      >
        <Toolbar variant="dense" className={classes.drawerToolbar}>
          <IconButton size="small" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Sidebar />
      </Drawer>
      <Container>
        <>{children}</>
      </Container>
      <ScrollOnClick anchorSelector="#back-to-top-anchor">
        <Fab color="inherit" size="small" className={classes.topBtn}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollOnClick>
    </>
  );
};
