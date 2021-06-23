import React from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
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
      <Typography variant="body2" className={classes.label}>
        {format(new Date(time), 'h:mm aaa')}
      </Typography>
    </div>
  );
};
