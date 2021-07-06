import { useSnackbar } from 'notistack';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useApi, useErrorHandler } from '../../../api';
import { Activity } from '../../types';
import { ItemIcon, ItemText, MenuItem } from '../../../common/atoms/ContextMenu';

interface DeleteActivityMenuItemProps {
  activity: Activity;
  onClick: () => void;
}

const DeleteActivityMenuItem: React.VFC<DeleteActivityMenuItemProps> = ({ activity, onClick }) => {
  const apiUtils = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrorHandler();
  const handleDelete = React.useCallback(async () => {
    try {
      onClick();
      enqueueSnackbar('Removing...', { variant: 'info' });
      await apiUtils.deleteActivity(activity.id);
      enqueueSnackbar('Remove success!', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  }, [apiUtils, activity.id, enqueueSnackbar, handleError, onClick]);

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
