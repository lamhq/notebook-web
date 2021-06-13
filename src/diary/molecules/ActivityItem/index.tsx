import React from 'react';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Chip } from '../../../common/atoms/Chip';
import { TimeLabel } from '../../atoms/TimeLabel';

const useStyles = makeStyles((theme) => ({
  content: () => ({
    margin: '0.5rem 0',
  }),
  meta: () => ({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  itemsContainer: () => ({
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '8px',
  }),
  income: () => ({
    backgroundColor: theme.palette.success.main,
  }),
  outcome: () => ({
    backgroundColor: theme.palette.error.main,
  }),
  tagItem: () => ({
    backgroundColor: theme.palette.primary.main,
  }),
}));

export interface Activity {
  content: string;
  time: Date;
  tags: string[];
  income: number;
  outcome: number;
}

export interface ActivityItemProps {
  model: Activity;
}

export const ActivityItem: React.VFC<ActivityItemProps> = ({ model }) => {
  const classes = useStyles();
  const html = model.content.replace('\n', '<br/>');
  const income = numeral(model.income).format('0,0.[00]');
  const outcome = numeral(model.outcome).format('0,0.[00]');

  return (
    <div>
      <div className={classes.meta}>
        <TimeLabel time={model.time} />
        <MoreHorizIcon />
      </div>
      <div className={classes.content} dangerouslySetInnerHTML={{ __html: html }} />
      <div className={classes.meta}>
        <div className={classes.itemsContainer}>
          {model.income > 0 && <Chip label={income} className={classes.income} />}
          {model.outcome > 0 && <Chip label={outcome} className={classes.outcome} />}
        </div>
        <div className={classes.itemsContainer}>
          {model.tags.map((tag) => (
            <Chip label={tag} key={tag} className={classes.tagItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
