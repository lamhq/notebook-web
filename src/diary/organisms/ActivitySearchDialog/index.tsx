import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, IconButton } from '../../../common/atoms/Button';
import { ActivitySearchForm } from '../ActivitySearchForm';

export const ActivitySearchDialog: React.VFC = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="default" onClick={handleClickOpen}>
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search activities</DialogTitle>
        <DialogContent>
          <ActivitySearchForm />
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" onClick={handleClose} color="primary">
            Search
          </Button>
          <Button size="small" variant="contained" onClick={handleClose} color="default">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
