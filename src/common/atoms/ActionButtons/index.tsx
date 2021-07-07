import { styled } from '@material-ui/core/styles';

/**
 * Buttons container
 */
const ActionButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gridColumnGap: theme.spacing(2),
}));

export default ActionButtons;
