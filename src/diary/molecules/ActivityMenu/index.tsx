import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Activity } from '../../types';
import { ItemIcon, ItemText, Menu, MenuItem } from '../../../common/atoms/Menu';
import { IconButton } from '../../../common/atoms/Button';

export interface ActivityMenuProps {
  model: Activity;
}

export const ActivityMenu: React.VFC<ActivityMenuProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ItemIcon>
            <BorderColorIcon fontSize="small" />
          </ItemIcon>
          <ItemText primary="Update" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ItemIcon>
            <DeleteIcon fontSize="small" />
          </ItemIcon>
          <ItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
};
