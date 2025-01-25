import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '../../../common/atoms/Typography/Typography';
import { formatNumber } from '../../../common/utils';
import TimeLabel from '../../atoms/TimeLabel/TimeLabel';
import type { Activity } from '../../types';
import ActivityMenu from '../ActivityMenu/ActivityMenu';

export type ActivityItemProps = {
  model: Activity;
}

export default function ActivityItem({ model }: ActivityItemProps) {
  const html = model.content.replace(/\n/g, '<br/>');

  return (
    <>
      <Grid container spacing={0} justifyContent="space-between">
        <TimeLabel time={model.time} />
        <ActivityMenu activity={model} />
      </Grid>
      <Typography
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: html }}
        variant="body1"
        sx={{ marginBottom: 1, lineHeight: 1.8 }}
      />
      <Grid container spacing={0} justifyContent="space-between">
        <Box sx={{ display: 'flex', columnGap: 1 }}>
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
        <Box sx={{ display: 'flex', columnGap: 1 }}>
          {model.tags.map((tag) => (
            <Typography key={tag} variant="body2" sx={{ color: 'primary.main' }}>
              {`#${tag}`}
            </Typography>
          ))}
        </Box>
      </Grid>
    </>
  );
}
