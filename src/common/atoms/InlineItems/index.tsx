import { styled, withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export const InlineItems = withTheme(
  styled(Box)(({ theme }) => ({
    gap: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  })),
);
