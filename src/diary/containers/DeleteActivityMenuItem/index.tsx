import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';

import { useApi } from '../../../api';
import { Activity } from '../../types';
import { ItemIcon, ItemText, MenuItem } from '../../../common/atoms/ContextMenu';
import { useConfirm } from '../../../confirm';
import { useErrorHandler } from '../../../error';
import { activityFilterState } from '../../states';

type RefreshFn = () => void;

function useRefreshActivityList(): RefreshFn {
  const setActivityFilter = useSetRecoilState(activityFilterState);
  // prettier-ignore
  const refresh = useCallback(
    () => setActivityFilter((filter) => ({ ...filter })),
    [ setActivityFilter ],
  );
  return refresh;
}

interface DeleteActivityMenuItemProps {
  activity: Activity;
  closeMenu: () => void;
}

const DeleteActivityMenuItem: React.VFC<DeleteActivityMenuItemProps> = ({
  activity,
  closeMenu,
}) => {
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrorHandler();
  const confirm = useConfirm();
  const refreshActivityList = useRefreshActivityList();
  const handleDelete = React.useCallback(async () => {
    try {
      closeMenu();
      const shouldDelete = await confirm();
      if (!shouldDelete) return;
      enqueueSnackbar('Removing...', { variant: 'info' });
      await api.deleteActivity(activity.id);
      enqueueSnackbar('Remove success!', { variant: 'success' });
      refreshActivityList();
    } catch (error) {
      handleError(error);
    }
  }, [api, activity.id, enqueueSnackbar, confirm, handleError, closeMenu, refreshActivityList]);

  return (
    <MenuItem onClick={handleDelete}>
      <ItemIcon>
        <DeleteIcon fontSize="small" />
      </ItemIcon>
      <ItemText primary="Delete" />
    </MenuItem>
  );
};

export default DeleteActivityMenuItem;
