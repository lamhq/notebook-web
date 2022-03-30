import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimeLabel from '../../atoms/TimeLabel';
import { Activity } from '../../types';
import ActivityMenu from '../ActivityMenu';
import { formatNumber } from '../../../common/utils';

export interface ActivityItemProps {
  model: Activity;
}

const ActivityItem: React.VFC<ActivityItemProps> = ({ model }) => {
  const html = model.content.replace(/\n/g, '<br/>');

  return (
    <>
      <Grid container spacing={0} justifyContent="space-between">
        <TimeLabel time={model.time} />
        <ActivityMenu activity={model} />
      </Grid>
      <Typography
        dangerouslySetInnerHTML={{ __html: html }}
        variant="body1"
        sx={{ marginBottom: 1, lineHeight: 1.8 }}
      />
      <Grid container spacing={0} justifyContent="space-between">
        <Box sx={{ display: 'flex', gridColumnGap: 1 }}>
          {Boolean(model.income && model.income > 0) && (
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              {formatNumber(model.income)}
            </Typography>
          )}
          {Boolean(model.outcome && model.outcome > 0) && (
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              {formatNumber(model.outcome)}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gridColumnGap: 1 }}>
          {model.tags.map((tag) => (
            <Typography key={tag} variant="body2" sx={{ color: 'primary.main' }}>
              {`#${tag}`}
            </Typography>
          ))}
        </Box>
      </Grid>
    </>
  );
};

export default ActivityItem;
