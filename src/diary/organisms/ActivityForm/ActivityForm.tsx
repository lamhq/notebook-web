import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router';
import * as yup from 'yup';

import ButtonsContainer from '../../../common/atoms/ButtonsContainer';
import DateTimePicker from '../../../common/atoms/DateTimePicker/DateTimePicker';
import ActivityTagSelect from '../../molecules/ActivityTagSelect';
import type { ActivityFormData } from '../../types';
import { getTotalAmounts as calcAmounts } from '../../utils';

const activityFormSchema = yup.object().shape({
  time: yup.date().required(),
  content: yup.string().required('This field is required'),
  tags: yup.array(yup.string().required()).required(),
  income: yup.number(),
  outcome: yup.number(),
});

export type ActivityFormProps = {
  defaultValues: ActivityFormData;
  onSubmit: SubmitHandler<ActivityFormData>;
};

export default function ActivityForm({
  defaultValues,
  onSubmit,
}: ActivityFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<ActivityFormData>({
    defaultValues,
    resolver: yupResolver(activityFormSchema),
  });

  // auto set income and outcome value base on activity's note
  const noteContent = watch('content');
  useEffect(() => {
    const [income, outcome] = calcAmounts(noteContent);
    setValue('income', income !== 0 ? income : undefined);
    setValue('outcome', outcome !== 0 ? outcome : undefined);
  }, [noteContent, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                label="Content"
                required
                error={!!errors.content}
                helperText={errors.content?.message}
                slotProps={{
                  input: {
                    inputComponent: TextareaAutosize,
                  },
                }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="tags"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <ActivityTagSelect
                label="Tags"
                onChange={(_, v) => {
                  onChange(v);
                }}
                freeSolo
                {...rest}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Time"
                error={!!errors.time}
                helperText={errors.time?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="income"
            control={control}
            render={({ field }) => (
              <TextField
                label="Income"
                type="number"
                error={!!errors.income}
                helperText={errors.income?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="outcome"
            control={control}
            render={({ field }) => (
              <TextField
                label="Outcome"
                type="number"
                error={!!errors.outcome}
                helperText={errors.outcome?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <ButtonsContainer>
        <Button variant="contained" color="secondary" component={RouterLink} to="/">
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </ButtonsContainer>
    </form>
  );
}
