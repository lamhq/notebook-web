import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { TagInput } from '../../../common/atoms/TagInput';
import { DatePicker } from '../../../common/atoms/DatePicker';
import { ActivityFormModel } from '../../types';
import { SubLayout } from '../../../common/templates/SubLayout';

const defaultValues: ActivityFormModel = {
  content: '',
  tags: [],
  time: new Date(),
  income: 0,
  outcome: 0,
};

const AddActivityPage: React.VFC = () => {
  const { control, handleSubmit } = useForm<ActivityFormModel>({
    defaultValues,
  });
  const handleFormSubmit: SubmitHandler<ActivityFormModel> = (data) => {
    console.log(data);
  };
  return (
    <SubLayout title="Add Activity">
      <form id="activitySearchForm" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel shrink>Content</InputLabel>
              <Controller
                name="content"
                control={control}
                render={({ onChange, value }) => (
                  <Input value={value} onChange={onChange} inputComponent={TextareaAutosize} />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="tags"
              control={control}
              render={({ onChange, value }) => (
                <TagInput
                  value={value}
                  onChange={onChange}
                  options={['abc', 'def', 'ghi']}
                  creatable
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="time"
              control={control}
              render={({ onChange, value }) => (
                <DatePicker value={value} onChange={onChange} label="Time" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="income"
              control={control}
              render={({ onChange, value }) => (
                <TextField value={value} onChange={onChange} label="Income" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="outcome"
              control={control}
              render={({ onChange, value }) => (
                <TextField value={value} onChange={onChange} label="Outcome" />
              )}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" gridColumnGap={16}>
          <Button variant="contained" color="default">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </SubLayout>
  );
};

export default AddActivityPage;
