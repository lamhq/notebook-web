import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link as RouterLink } from 'react-router-dom';
import { useSetIdentity } from '../../../../identity';
import { useApi } from '../../../../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nestedList: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export const ListItemIcon = withStyles({
  root: {
    minWidth: 40,
  },
})(MuiListItemIcon);

export const Sidebar: React.VFC = () => {
  const classes = useStyles();
  const setIdentity = useSetIdentity();
  const apiClient = useApi();
  const logout = React.useCallback(async () => {
    apiClient.logout();
    setIdentity(undefined);
  }, [setIdentity, apiClient]);
  return (
    <>
      <List>
        <ListItem button component={RouterLink} to="/profile">
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
          <ListItem button className={classes.nestedList} component={RouterLink} to="/">
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};
