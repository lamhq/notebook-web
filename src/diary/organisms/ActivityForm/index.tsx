import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TagInput from '../../../common/atoms/TagInput';
import { DateTimePicker } from '../../../common/atoms/DatePicker';
import { ActivityFormModel } from '../../types';
import Textarea from '../../../common/atoms/Textarea';
import ActionButtons from '../../../common/atoms/ActionButtons';
import { useNavUtils } from '../../../common/hooks';

export interface ActivityFormProps {
  defaultValues: ActivityFormModel;
  onSubmit: SubmitHandler<ActivityFormModel>;
}

const ActivityForm: React.VFC<ActivityFormProps> = ({ defaultValues, onSubmit }) => {
  const { getLinkProps } = useNavUtils();
  const { register, control, handleSubmit } = useForm<ActivityFormModel>({
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            {...register('content')}
            label="Content"
            InputProps={{
              inputComponent: Textarea,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagInput {...register('tags')} options={['abc', 'def', 'ghi']} freeSolo />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="time"
            control={control}
            render={({ field }) => <DateTimePicker label="Time" {...field} />}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('income')} type="number" label="Income" />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('outcome')} type="number" label="Outcome" />
        </Grid>
      </Grid>
      <ActionButtons>
        <Button variant="contained" color="default" {...getLinkProps()}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </ActionButtons>
    </form>
  );
};

export default ActivityForm;
