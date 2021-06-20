import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from '../../../common/atoms/TextField';
import { TagInput } from '../../../common/atoms/TagInput';
import { DatePicker } from '../../../common/atoms/DatePicker';
import { TimeRangeSelect } from '../../atoms/TimeRangeSelect';
import { TimeRange } from '../../types';

interface ActivitySearchFormValues {
  text: string;
  tag: string[];
  timeRange: TimeRange;
  from: Date;
  to: Date;
}

export const ActivitySearchForm: React.VFC = () => {
  const { handleSubmit, watch } = useForm<ActivitySearchFormValues>();
  const onSubmit: SubmitHandler<ActivitySearchFormValues> = (data) => console.log(data);
  const timeRange = watch('timeRange');
  console.log(timeRange);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField label="Text" type="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagInput value={['abc']} onChange={() => undefined} options={['abc', 'def', 'ghi']} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimeRangeSelect />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker value={new Date()} onChange={() => undefined} label="From" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker value={new Date()} onChange={() => undefined} label="To" />
        </Grid>
      </Grid>
    </form>
  );
};
