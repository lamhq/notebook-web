import React from 'react';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    fontSize: '0.6875rem',
    borderRadius: '3px',
  },
  labelSmall: {
    padding: '3px 6px',
  },
});

export type TagItemProps = ChipProps;

export const TagItem: React.VFC<TagItemProps> = (props) => {
  const classes = useStyles();
  return (
    <Chip
      color="primary"
      size="small"
      classes={{ root: classes.root, labelSmall: classes.labelSmall }}
      {...props}
    />
  );
};
