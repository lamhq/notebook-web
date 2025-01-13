import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import ButtonsContainer from '../../../common/atoms/ButtonsContainer';
import DatePicker from '../../../common/atoms/DatePicker/DatePicker';
import TimeRangeSelect from '../../atoms/TimeRangeSelect/TimeRangeSelect';
// import ActivityTagSelect from '../../containers/ActivityTagSelect';
import { TimeRange } from '../../types';
import type { ActivityFilterModel } from './types';

export interface ActivitySearchProps {
  values: ActivityFilterModel;
  onSubmit: SubmitHandler<ActivityFilterModel>;
}

export default function ActivitySearch({ values, onSubmit }: ActivitySearchProps) {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, watch, reset } = useForm<ActivityFilterModel>({
    defaultValues: values,
  });
  const timeRange = watch('timeRange');
  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const handleFormSubmit: SubmitHandler<ActivityFilterModel> = useCallback(
    (data) => {
      onSubmit(data);
      setOpen(false);
    },
    [onSubmit],
  );
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

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
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => <TextField label="Text" {...field} />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* <Controller
                  name="tags"
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <ActivityTagSelect
                      label="Tags"
                      onChange={(e, v) => onChange(v)}
                      {...rest}
                    />
                  )}
                /> */}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="timeRange"
                  control={control}
                  render={({ field }) => (
                    <TimeRangeSelect label="Time range" {...field} />
                  )}
                />
              </Grid>
              {timeRange === TimeRange.Custom && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="from"
                      control={control}
                      render={({ field }) => <DatePicker label="From" {...field} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="to"
                      control={control}
                      render={({ field }) => <DatePicker label="To" {...field} />}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <ButtonsContainer>
            <Button
              onClick={handleReset}
              size="small"
              variant="contained"
              color="secondary"
            >
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
          </ButtonsContainer>
        </DialogActions>
      </Dialog>
    </>
  );
}
