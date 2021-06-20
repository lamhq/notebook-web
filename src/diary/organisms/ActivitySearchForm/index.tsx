import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from '../../../common/atoms/TextField';
import { TagInput } from '../../../common/atoms/TagInput';
import { DatePicker } from '../../../common/atoms/DatePicker';
import { TimeRangeSelect } from '../../atoms/TimeRangeSelect';
import { TimeRange } from '../../types';

interface ActivitySearchFormValues {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  from: Date;
  to: Date;
}

const defaultValues: ActivitySearchFormValues = {
  text: '',
  tags: [],
  timeRange: TimeRange.ThisMonth,
  from: new Date(),
  to: new Date(),
};

export const ActivitySearchForm: React.VFC = () => {
  const { control, handleSubmit, watch } = useForm<ActivitySearchFormValues>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<ActivitySearchFormValues> = (data) => console.log(data);
  const timeRange = watch('timeRange');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="text"
            control={control}
            render={({ onChange, value }) => (
              <TextField value={value} onChange={onChange} label="Text" />
            )}
          />
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
            render={({ onChange, value }) => <TimeRangeSelect value={value} onChange={onChange} />}
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
  );
};
