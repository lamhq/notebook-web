import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import MuiMenu, { MenuProps as MuiMenuProps } from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';

export const Menu = withStyles((theme: Theme) => ({
  paper: {
    borderColor: theme.palette.grey['400'],
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  list: {
    padding: 0,
  },
}))((props: MuiMenuProps) => (
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

export const ItemText = withStyles({
  root: {
    margin: 0,
    '& .MuiListItemText-primary': {
      fontSize: '0.9375rem',
      lineHeight: 'normal',
    },
  },
})(MuiListItemText);
