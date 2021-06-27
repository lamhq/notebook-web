import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TagInput } from '../../../common/atoms/TagInput';
import { DateTimePicker } from '../../../common/atoms/DatePicker';
import { ActivityFormModel } from '../../types';
import { Textarea } from '../../../common/atoms/Textarea';
import { Actions } from '../../../common/atoms/Actions';
import { useNavigator } from '../../../common/hooks';

export interface ActivityFormProps {
  defaultValues: ActivityFormModel;
  onSubmit: SubmitHandler<ActivityFormModel>;
}

export const ActivityForm: React.VFC<ActivityFormProps> = ({ defaultValues, onSubmit }) => {
  const { getLinkProps } = useNavigator();
  const { control, handleSubmit } = useForm<ActivityFormModel>({
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="content"
            control={control}
            as={TextField}
            label="Content"
            InputProps={{
              inputComponent: Textarea,
            }}
          />
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
              <DateTimePicker value={value} onChange={onChange} label="Time" />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller name="income" control={control} label="Income" as={TextField} type="number" />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="outcome"
            control={control}
            label="Outcome"
            as={TextField}
            type="number"
          />
        </Grid>
      </Grid>
      <Actions>
        <Button variant="contained" color="default" {...getLinkProps()}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Actions>
    </form>
  );
};
