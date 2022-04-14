import React from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ActivityItem from '../../molecules/ActivityItem';
import { Activity } from '../../types';

export interface ActivityListProps {
  models: Activity[];
}

interface ActivityGroup {
  [key: string]: Activity[];
}

const ActivityList: React.VFC<ActivityListProps> = ({ models }) => {
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
            <React.Fragment key={model.id}>
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
            </React.Fragment>
          ))}
        </Box>
      ))}
    </>
  );
};

export default ActivityList;
