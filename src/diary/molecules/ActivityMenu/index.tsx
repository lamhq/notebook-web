import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Activity } from '../../types/activity';
import { ItemIcon, ItemText, Menu, MenuItem } from '../../../common/atoms/Menu';

const useStyles = makeStyles({
  button: {
    padding: 0,
  },
});

export interface ActivityMenuProps {
  model: Activity;
}

export const ActivityMenu: React.VFC<ActivityMenuProps> = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick} classes={{ sizeSmall: classes.button }}>
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
