import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';

export interface SubLayoutProps {
  title: string;
}

export const SubLayout: React.FC<SubLayoutProps> = ({ title, children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={2}>
              <IconButton edge="start" color="inherit" size="small">
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" align="center" component="h1">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
