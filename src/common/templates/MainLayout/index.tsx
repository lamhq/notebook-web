import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TimelineIcon from '@material-ui/icons/Timeline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import { ScrollOnClick } from '../../atoms/ScrollOnClick';
import { HideOnScroll } from '../../atoms/HideOnScroll';
import { InlineItems } from '../../atoms/InlineItems';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: 200,
    },
    nestedList: {
      paddingLeft: theme.spacing(4),
    },
    toolbarTop: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

export const ListItemIcon = withStyles({
  root: {
    minWidth: 40,
  },
})(MuiListItemIcon);

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
            <InlineItems>
              <IconButton edge="start" color="inherit" size="small" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">{title}</Typography>
            </InlineItems>
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
        <Toolbar variant="dense" className={classes.toolbarTop}>
          <IconButton size="small" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Diary" />
            <ExpandLess />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem button className={classes.nestedList}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Activities" />
            </ListItem>
          </List>
        </List>
      </Drawer>
      {children}
      <ScrollOnClick anchorSelector="#back-to-top-anchor">
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollOnClick>
    </>
  );
};
