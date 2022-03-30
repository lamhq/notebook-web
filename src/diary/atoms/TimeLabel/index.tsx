import React from 'react';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export interface TimeLabelProps {
  time: string;
}

const TimeLabel: React.VFC<TimeLabelProps> = ({ time }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AccessTimeIcon sx={{ fontSize: '1.125rem', color: 'grey.500', marginRight: '4px' }} />
      <Typography variant="body2" sx={{ color: 'grey.500' }}>
        {format(new Date(time), 'h:mm aaa')}
      </Typography>
    </Box>
  );
};

export default TimeLabel;
