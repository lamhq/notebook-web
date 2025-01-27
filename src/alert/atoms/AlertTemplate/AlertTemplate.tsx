import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import type { AlertTemplateProps } from '../../types';

export default function AlertTemplate({ items }: AlertTemplateProps) {
  return (
    <Stack spacing={1}>
      {items.map(({ type, message, remove, timestamp }) => (
        <MuiAlert severity={type} onClose={remove} key={timestamp}>
          {message}
        </MuiAlert>
      ))}
    </Stack>
  );
}
