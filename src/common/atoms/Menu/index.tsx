import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiMenu, { MenuProps as MuiMenuProps } from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  itemTextCont: {
    margin: 0,
  },
  itemText: {
    fontSize: '0.9375rem',
    lineHeight: 'normal',
  },
});

export const Menu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  list: {
    padding: '4px',
  },
})((props: MuiMenuProps) => (
  <MuiMenu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    keepMounted
    elevation={0}
    {...props}
  />
));

export const MenuItem = withStyles({
  root: {
    minHeight: 0,
    lineHeight: 'normal',
    padding: '8px',
    margin: 0,
  },
})(MuiMenuItem);

export const ItemIcon = withStyles({
  root: {
    minWidth: 0,
    width: '1.25rem',
    marginRight: '0.75rem',
  },
})(MuiListItemIcon);

export const ItemText: React.FC<ListItemTextProps> = (props) => {
  const classes = useStyles();
  return (
    <MuiListItemText
      classes={{ root: classes.itemTextCont }}
      primaryTypographyProps={{ classes: { root: classes.itemText } }}
      {...props}
    />
  );
};
