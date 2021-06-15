import React from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.75rem',
    color: '#9e9e9e',
  },
  icon: {
    fontSize: '1.125rem',
    color: '#9e9e9e',
    marginRight: '4px',
  },
});

export interface TimeLabelProps {
  time: string;
}

export const TimeLabel: React.VFC<TimeLabelProps> = ({ time }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AccessTimeIcon classes={{ root: classes.icon }} />
      <span className={classes.label}>{format(new Date(time), 'h:mm aaa')}</span>
    </div>
  );
};
