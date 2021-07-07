import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import { Activity } from '../../types';
import { ItemIcon, ItemText, Menu, MenuItem } from '../../../common/atoms/ContextMenu';
import { useNavUtils } from '../../../common/hooks';
import DeleteActivityMenuItem from '../DeleteActivityMenuItem';

export interface ActivityMenuProps {
  activity: Activity;
}

const ActivityMenu: React.VFC<ActivityMenuProps> = ({ activity }) => {
  const { getLinkProps } = useNavUtils();
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
        <MenuItem {...getLinkProps(`/activities/edit/${activity.id}`)}>
          <ItemIcon>
            <BorderColorIcon fontSize="small" />
          </ItemIcon>
          <ItemText primary="Update" />
        </MenuItem>
        <DeleteActivityMenuItem activity={activity} closeMenu={handleClose} />
      </Menu>
    </>
  );
};

export default ActivityMenu;
