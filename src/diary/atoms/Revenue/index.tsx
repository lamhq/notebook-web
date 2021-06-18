import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { Chip } from '../../../common/atoms/Chip';
import { formatNumber } from '../../../common/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positive: {
      backgroundColor: theme.palette.success.main,
    },
    negative: {
      backgroundColor: theme.palette.error.main,
    },
    popover: {
      fontSize: '0.6875rem',
      padding: theme.spacing(1),
    },
    incomeText: {
      color: theme.palette.success.main,
    },
    outcomeText: {
      color: theme.palette.error.main,
    },
  }),
);

export interface RevenueProps {
  income: number;
  outcome: number;
}

export const Revenue: React.VFC<RevenueProps> = ({ income, outcome }) => {
  const classes = useStyles();
  const label = formatNumber(Math.abs(income - outcome));
  const it = formatNumber(income);
  const ot = formatNumber(outcome);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'revenue-popover' : undefined;

  const handleClick: React.MouseEventHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        label={label}
        className={income >= outcome ? classes.positive : classes.negative}
        onClick={handleClick}
        size="small"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography className={classes.popover}>
          <span className={classes.incomeText}>{it}</span>
          &nbsp;/&nbsp;
          <span className={classes.outcomeText}>{ot}</span>
        </Typography>
      </Popover>
    </>
  );
};
