import { useSnackbar } from 'notistack';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSetRecoilState } from 'recoil';
import { useApi } from '../../../api';
import { Activity } from '../../types';
import { ItemIcon, ItemText, MenuItem } from '../../../common/atoms/ContextMenu';
import { useConfirm } from '../../../confirm';
import { activityFilterState } from '../../states';
import { useErrorHandler } from '../../../error';

interface DeleteActivityMenuItemProps {
  activity: Activity;
  closeMenu: () => void;
}

const DeleteActivityMenuItem: React.VFC<DeleteActivityMenuItemProps> = ({
  activity,
  closeMenu,
}) => {
  const apiUtils = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrorHandler();
  const confirm = useConfirm();
  const setFilter = useSetRecoilState(activityFilterState);
  const refreshActivityList = React.useCallback(() => setFilter((filter) => ({ ...filter })), [
    setFilter,
  ]);
  const handleDelete = React.useCallback(async () => {
    try {
      closeMenu();
      const shouldDelete = await confirm();
      if (!shouldDelete) return;
      enqueueSnackbar('Removing...', { variant: 'info' });
      await apiUtils.deleteActivity(activity.id);
      enqueueSnackbar('Remove success!', { variant: 'success' });
      refreshActivityList();
    } catch (error) {
      handleError(error);
    }
  }, [
    apiUtils,
    activity.id,
    enqueueSnackbar,
    confirm,
    handleError,
    closeMenu,
    refreshActivityList,
  ]);

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