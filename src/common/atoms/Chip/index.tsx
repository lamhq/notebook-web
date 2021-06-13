import React from 'react';
import MChip, { ChipProps as MChipProps } from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    fontSize: '0.6875rem',
    borderRadius: '3px',
    color: '#fff',
  },
  labelSmall: {
    padding: '2px 6px',
  },
  sizeSmall: {
    height: 'auto',
  },
});

export type ChipProps = MChipProps;

export const Chip: React.VFC<ChipProps> = (props) => {
  const classes = useStyles();
  return (
    <MChip
      size="small"
      classes={{
        root: classes.root,
        labelSmall: classes.labelSmall,
        sizeSmall: classes.sizeSmall,
      }}
      {...props}
    />
  );
};
