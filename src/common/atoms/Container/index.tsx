import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import MuiContainer, { ContainerProps } from '@material-ui/core/Container';

const Container = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))((props: ContainerProps) => <MuiContainer maxWidth="sm" {...props} />);

export default Container;
