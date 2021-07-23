import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export interface ScrollToProps {
  anchorSelector: string;
}

const ScrollOnClick: React.FC<ScrollToProps> = ({ children, anchorSelector }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      const anchor = (event.currentTarget.ownerDocument || document).querySelector(anchorSelector);
      // const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      //   anchorSelector,
      // );

      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [anchorSelector],
  );

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollOnClick;
