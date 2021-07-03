import React from 'react';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export const LoadingContent: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={200}>
      <Fade in unmountOnExit>
        <CircularProgress />
      </Fade>
    </Box>
  );
};
