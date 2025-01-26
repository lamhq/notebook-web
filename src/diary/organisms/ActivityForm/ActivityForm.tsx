import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextareaAutosize } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router';
import type * as yup from 'yup';

import ButtonsContainer from '../../../common/atoms/ButtonsContainer';
import DateTimePicker from '../../../common/atoms/DateTimePicker/DateTimePicker';
import LoadingButton from '../../../common/atoms/LoadingButton/LoadingButton';

// import ActivityTagSelect from '../../containers/ActivityTagSelect';
import { getTotalAmounts, yupSchema } from '../../utils';

export type ActivityFormModel = {} & yup.InferType<typeof yupSchema>;

export type ActivityFormProps = {
  defaultValues: ActivityFormModel;
  onSubmit: SubmitHandler<ActivityFormModel>;
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
  } = useForm<ActivityFormModel>({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });

  // auto set income and outcome value base on amount in note content
  const noteContent = watch('content');
  useEffect(() => {
    const [income, outcome] = getTotalAmounts(noteContent);
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
          {/* <Controller
            name="tags"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <ActivityTagSelect
                label="Tags"
                onChange={(e, v) => onChange(v)}
                freeSolo
                {...rest}
              />
            )}
          /> */}
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
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </LoadingButton>
      </ButtonsContainer>
    </form>
  );
}
