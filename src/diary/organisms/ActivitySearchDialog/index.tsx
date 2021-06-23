import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FilterListIcon from '@material-ui/icons/FilterList';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { TagInput } from '../../../common/atoms/TagInput';
import { DatePicker } from '../../../common/atoms/DatePicker';
import { TimeRangeSelect } from '../../atoms/TimeRangeSelect';
import { TimeRange } from '../../types';

interface ActivityFilterModel {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  from: Date;
  to: Date;
}

const defaultValues: ActivityFilterModel = {
  text: '',
  tags: [],
  timeRange: TimeRange.ThisMonth,
  from: new Date(),
  to: new Date(),
};

export const ActivitySearchDialog: React.VFC = () => {
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, watch, reset } = useForm<ActivityFilterModel>({
    defaultValues,
  });
  const timeRange = watch('timeRange');

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFormSubmit: SubmitHandler<ActivityFilterModel> = (data) => {
    console.log(data);
    setOpen(false);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <IconButton color="default" size="small" onClick={handleOpenDialog}>
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog} keepMounted>
        <DialogTitle>Search activities</DialogTitle>
        <DialogContent>
          <form id="activitySearchForm" onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller name="text" control={control} as={TextField} label="Text" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tags"
                  control={control}
                  render={({ onChange, value }) => (
                    <TagInput value={value} onChange={onChange} options={['abc', 'def', 'ghi']} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="timeRange"
                  control={control}
                  render={({ onChange, value }) => (
                    <TimeRangeSelect value={value} onChange={onChange} label="Time range" />
                  )}
                />
              </Grid>
              {timeRange === TimeRange.Custom && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="from"
                      control={control}
                      render={({ onChange, value }) => (
                        <DatePicker value={value} onChange={onChange} label="From" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="to"
                      control={control}
                      render={({ onChange, value }) => (
                        <DatePicker value={value} onChange={onChange} label="To" />
                      )}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Box display="flex" gridColumnGap={16}>
            <Button size="small" variant="contained" onClick={handleReset} color="default">
              Reset
            </Button>
            <Button
              type="submit"
              form="activitySearchForm"
              size="small"
              variant="contained"
              onClick={handleCloseDialog}
              color="primary"
            >
              Search
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
