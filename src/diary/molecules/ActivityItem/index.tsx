import React from 'react';
import numeral from 'numeral';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TimeLabel } from '../../atoms/TimeLabel';
import { Activity } from '../../types/activity';
import { ActivityMenu } from '../ActivityMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
  },
  content: () => ({
    margin: '0.5rem 0',
  }),
  meta: () => ({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  itemsContainer: () => ({
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  }),
  chip: {
    backgroundColor: 'transparent',
    fontSize: '0.75rem',
  },
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
  const income = numeral(model.income).format('0,0.[00]');
  const outcome = numeral(model.outcome).format('0,0.[00]');

  return (
    <div className={classes.container}>
      <div className={classes.meta}>
        <TimeLabel time={model.time} />
        <ActivityMenu model={model} />
      </div>
      <div className={classes.content} dangerouslySetInnerHTML={{ __html: html }} />
      <div className={classes.meta}>
        <div className={classes.itemsContainer}>
          {model.income > 0 && <span className={clsx(classes.chip, classes.income)}>{income}</span>}
          {model.outcome > 0 && (
            <span className={clsx(classes.chip, classes.outcome)}>{outcome}</span>
          )}
        </div>
        <div className={classes.itemsContainer}>
          {model.tags.map((tag) => (
            <span key={tag} className={clsx(classes.chip, classes.tagItem)}>
              {`#${tag}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
