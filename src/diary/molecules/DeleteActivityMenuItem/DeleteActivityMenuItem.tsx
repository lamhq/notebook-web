import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback } from 'react';
import { ItemIcon, ItemText, MenuItem } from '../../../common/atoms/ContextMenu';
import { formatDate } from '../../../common/utils';
import { useDialogs } from '../../../dialog';
import { useDeleteActivityMutation } from '../../hooks';
import type { Activity } from '../../types';

export type DeleteActivityMenuItemProps = {
  activity: Activity;
  onDeleted: () => void;
};

export default function DeleteActivityMenuItem({
  activity,
  onDeleted,
}: DeleteActivityMenuItemProps) {
  const [deleteActivity, { isLoading }] = useDeleteActivityMutation();
  const { confirm, alert } = useDialogs();

  const handleDelete = useCallback(async () => {
    try {
      const isOk = await confirm(
        `Are you sure to delete the activity on ${formatDate(activity.time)}?`,
      );
      if (!isOk) return;
      await deleteActivity(activity.id);
      onDeleted();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message).catch(console.error);
      } else {
        console.error('Unexpected error', error);
      }
    }
  }, [deleteActivity, onDeleted]);

  return (
    <MenuItem onClick={handleDelete} disabled={isLoading}>
      <ItemIcon>
        {isLoading ? (
          <CircularProgress size="15px" color="primary" />
        ) : (
          <DeleteIcon fontSize="small" />
        )}
      </ItemIcon>
      <ItemText primary="Delete" />
    </MenuItem>
  );
}
