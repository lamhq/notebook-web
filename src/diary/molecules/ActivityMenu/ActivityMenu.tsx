import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';
import { Link, type LinkProps } from 'react-router';
import {
  ItemIcon,
  ItemText,
  Menu,
  MenuItem,
} from '../../../common/atoms/ContextMenu';
// import DeleteActivityMenuItem from '../../containers/DeleteActivityMenuItem';
import type { Activity } from '../../types';

import { styled } from '@mui/material/styles';
import DeleteActivityMenuItem from '../DeleteActivityMenuItem/DeleteActivityMenuItem';

const UnstyledLink = styled(Link)<LinkProps>(() => ({
  display: 'flex',
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
}));

export type ActivityMenuProps = {
  activity: Activity;
};

export default function ActivityMenu({ activity }: ActivityMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  return (
    <>
      <IconButton size="small" onClick={showMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem>
          <UnstyledLink to={`/activities/edit/${activity.id}`}>
            <ItemIcon>
              <BorderColorIcon fontSize="small" />
            </ItemIcon>
            <ItemText primary="Update" />
          </UnstyledLink>
        </MenuItem>
        <DeleteActivityMenuItem activity={activity} onDeleted={closeMenu} />
      </Menu>
    </>
  );
}
