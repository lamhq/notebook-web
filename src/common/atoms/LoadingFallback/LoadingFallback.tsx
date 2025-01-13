import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

export default function LoadingFallback() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={200}>
      <Fade in unmountOnExit>
        <CircularProgress />
      </Fade>
    </Box>
  );
}
