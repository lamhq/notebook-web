import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { Link, type LinkProps } from 'react-router';
import {
  ItemIcon,
  ItemText,
  Menu,
  MenuItem,
} from '../../../common/atoms/ContextMenu/ContextMenu';
// import DeleteActivityMenuItem from '../../containers/DeleteActivityMenuItem';
import type { Activity } from '../../types';

import { styled } from '@mui/material/styles';

const UnstyledLink = styled(Link)<LinkProps>(() => ({
  display: 'flex',
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
}));

export interface ActivityMenuProps {
  activity: Activity;
}

export default function ActivityMenu({ activity }: ActivityMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick: React.MouseEventHandler = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <UnstyledLink to={`/activities/edit/${activity.id}`}>
            <ItemIcon>
              <BorderColorIcon fontSize="small" />
            </ItemIcon>
            <ItemText primary="Update" />
          </UnstyledLink>
        </MenuItem>
        {/* <DeleteActivityMenuItem activity={activity} closeMenu={handleClose} /> */}
      </Menu>
    </>
  );
}
