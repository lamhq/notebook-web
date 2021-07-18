import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TimeLabel from '../../atoms/TimeLabel';
import { Activity } from '../../types';
import ActivityMenu from '../ActivityMenu';
import { formatNumber } from '../../../common/utils';

const useStyles = makeStyles((theme) => ({
  content: () => ({
    marginBottom: theme.spacing(1),
    lineHeight: 1.8,
  }),
  income: () => ({
    color: theme.palette.success.main,
  }),
  outcome: () => ({
    color: theme.palette.error.main,
  }),
  tagItem: () => ({
    color: theme.palette.primary.main,
  }),
}));

export interface ActivityItemProps {
  model: Activity;
}

const ActivityItem: React.VFC<ActivityItemProps> = ({ model }) => {
  const classes = useStyles();
  const html = model.content.replace('\n', '<br/>');
  const income = formatNumber(model.income);
  const outcome = formatNumber(model.outcome);

  return (
    <>
      <Grid container justify="space-between" spacing={0}>
        <TimeLabel time={model.time} />
        <ActivityMenu activity={model} />
      </Grid>
      <Typography
        dangerouslySetInnerHTML={{ __html: html }}
        variant="body1"
        className={classes.content}
      />
      <Grid container justify="space-between" spacing={0}>
        <Box display="flex" gridColumnGap={8}>
          {model.income && model.income > 0 && (
            <Typography variant="body2" className={classes.income}>
              {income}
            </Typography>
          )}
          {model.outcome && model.outcome > 0 && (
            <Typography variant="body2" className={classes.outcome}>
              {outcome}
            </Typography>
          )}
        </Box>
        <Box display="flex" gridColumnGap={8}>
          {model.tags.map((tag) => (
            <Typography key={tag} variant="body2" className={classes.tagItem}>
              {`#${tag}`}
            </Typography>
          ))}
        </Box>
      </Grid>
    </>
  );
};

export default ActivityItem;
