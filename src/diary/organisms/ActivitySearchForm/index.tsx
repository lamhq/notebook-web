import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '../../../common/atoms/TextField';
import { TagInput } from '../../../common/atoms/TagInput';
import { DatePicker } from '../../../common/atoms/DatePicker';
import { TimeRangeSelect } from '../../atoms/TimeRangeSelect';

export const ActivitySearchForm: React.VFC = () => {
  return (
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
  );
};
