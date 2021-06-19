import React from 'react';
import MuiChip, { ChipProps } from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

export const Chip = withStyles({
  root: {
    borderRadius: '3px',
    color: '#fff',
  },
  labelSmall: {
    padding: '2px 6px',
  },
  sizeSmall: {
    height: 'auto',
    fontSize: '0.6875rem',
  },
})((props: ChipProps) => <MuiChip size="small" {...props} />);
