import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { useRecoilValue } from 'recoil';
import Chip from '../../../common/atoms/Chip';
import { formatNumber } from '../../../common/utils';
import { revenueState } from './states';

export interface RevenueViewProps {
  income: number;
  outcome: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    backgroundColor: (props: RevenueViewProps) =>
      props.income > props.outcome ? theme.palette.success.main : theme.palette.error.main,
  },
  incomeText: {
    color: theme.palette.success.main,
  },
  outcomeText: {
    color: theme.palette.error.main,
  },
  popover: {
    padding: theme.spacing(1),
  },
}));

export const RevenueView: React.VFC<RevenueViewProps> = (props) => {
  const { income, outcome } = props;
  const classes = useStyles(props);
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
      <Chip label={label} className={classes.chip} onClick={handleClick} />
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
        <Typography variant="body2" className={classes.popover}>
          <span className={classes.incomeText}>{it}</span>
          &nbsp;/&nbsp;
          <span className={classes.outcomeText}>{ot}</span>
        </Typography>
      </Popover>
    </>
  );
};

export const LoadableRevenue: React.VFC = () => {
  const { income, outcome } = useRecoilValue(revenueState);
  return <RevenueView income={income} outcome={outcome} />;
};

const Revenue: React.VFC = () => {
  return (
    <React.Suspense fallback="">
      <LoadableRevenue />
    </React.Suspense>
  );
};

export default Revenue;
