import React from 'react';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import MuiListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';

export const Menu: React.FC<MenuProps> = (props) => (
  <MuiMenu
    anchorEl={null}
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
    sx={{
      border: '1px solid #d3d4d5',
      '& .MuiList-root': {
        padding: '4px',
      },
    }}
    {...props}
  />
);

export const MenuItem: React.FC<MenuItemProps> = (props) => (
  <MuiMenuItem
    sx={{
      minHeight: 0,
      lineHeight: 'normal',
      padding: '8px',
      margin: 0,
      '& .MuiListItemIcon-root': {
        minWidth: 0,
      },
    }}
    {...props}
  />
);

export const ItemIcon: React.FC<ListItemIconProps> = (props) => (
  <MuiListItemIcon
    sx={{
      width: '1.25rem',
      marginRight: '0.75rem',
    }}
    {...props}
  />
);

export const ItemText: React.FC<ListItemTextProps> = (props) => (
  <MuiListItemText
    sx={{
      margin: 0,
      '& .MuiListItemText-primary': {
        fontSize: '0.9375rem',
        lineHeight: 'normal',
      },
    }}
    {...props}
  />
);
