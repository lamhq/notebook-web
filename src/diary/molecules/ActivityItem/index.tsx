import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TimeLabel } from '../../atoms/TimeLabel';
import { Activity } from '../../types';
import { ActivityMenu } from '../ActivityMenu';
import { formatNumber } from '../../../common/utils';
import { InlineItems } from '../../../common/atoms/InlineItems';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
  },
  content: () => ({
    marginBottom: '0.5rem',
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

export const ActivityItem: React.VFC<ActivityItemProps> = ({ model }) => {
  const classes = useStyles();
  const html = model.content.replace('\n', '<br/>');
  const income = formatNumber(model.income);
  const outcome = formatNumber(model.outcome);

  return (
    <div className={classes.container}>
      <Grid container justify="space-between" spacing={0}>
        <TimeLabel time={model.time} />
        <ActivityMenu model={model} />
      </Grid>
      <Typography
        dangerouslySetInnerHTML={{ __html: html }}
        variant="body1"
        className={classes.content}
      />
      <Grid container justify="space-between" spacing={0}>
        <InlineItems>
          {model.income > 0 && (
            <Typography variant="body2" className={classes.income}>
              {income}
            </Typography>
          )}
          {model.outcome > 0 && (
            <Typography variant="body2" className={classes.outcome}>
              {outcome}
            </Typography>
          )}
        </InlineItems>
        <InlineItems>
          {model.tags.map((tag) => (
            <Typography key={tag} variant="body2" className={classes.tagItem}>
              {`#${tag}`}
            </Typography>
          ))}
        </InlineItems>
      </Grid>
    </div>
  );
};

export default ActivityItem;
