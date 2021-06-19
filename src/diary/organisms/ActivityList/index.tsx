import React from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Activity } from '../../types/activity';
import { ActivityItem } from '../../molecules/ActivityItem';

const useStyles = makeStyles({
  section: {
    backgroundColor: '#fff',
    padding: '0.625rem',
    margin: '1rem 0',
  },
  divider: {
    height: '1px',
    margin: '1rem 0',
  },
});

export interface ActivityListProps {
  models: Activity[];
}

interface ActivityGroup {
  [key: string]: Activity[];
}

export const ActivityList: React.VFC<ActivityListProps> = ({ models }) => {
  const classes = useStyles();
  const dates = models.reduce((current, item) => {
    const date = format(new Date(item.time), 'EEE, d LLL, yyyy');
    const res = { ...current };
    if (!res[date]) res[date] = [];
    res[date].push(item);
    return res;
  }, {} as ActivityGroup);

  return (
    <>
      {Object.entries(dates).map(([date, activities]) => (
        <div key={date} className={classes.section}>
          <Typography component="h4" variant="h4" gutterBottom>
            {date}
          </Typography>
          {activities.map((model, index) => (
            <React.Fragment key={model.id}>
              {index > 0 && <Divider variant="middle" classes={{ root: classes.divider }} />}
              <ActivityItem model={model} />
            </React.Fragment>
          ))}
        </div>
      ))}
    </>
  );
};
