import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Fragment } from 'react';
import Typography from '../../../common/atoms/Typography';
import { formatDate } from '../../../common/utils';
import ActivityItem from '../../molecules/ActivityItem/ActivityItem';
import type { Activity } from '../../types';

export type ActivityListProps = {
  models: Activity[];
};

export default function ActivityList({ models }: ActivityListProps) {
  const dates = models.reduce<Record<string, Activity[]>>((current, item) => {
    const date = formatDate(item.time);
    const res = current;
    res[date] ??= [];
    res[date].push(item);
    return res;
  }, {});

  return (
    <>
      {Object.entries(dates).map(([date, activities]) => (
        <Box
          key={date}
          sx={{
            padding: 1,
            marginBottom: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography component="h4" variant="h4" gutterBottom>
            {date}
          </Typography>
          {activities.map((model, index) => (
            <Fragment key={model.id}>
              {index > 0 && (
                <Divider
                  variant="middle"
                  sx={{
                    height: '1px',
                    my: 1,
                    mx: 0,
                    borderBottomWidth: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  }}
                />
              )}
              <ActivityItem model={model} />
            </Fragment>
          ))}
        </Box>
      ))}
    </>
  );
}
