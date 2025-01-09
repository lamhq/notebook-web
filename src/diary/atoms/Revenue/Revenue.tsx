import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React from 'react';
import AmountBadge from '../../../common/atoms/AmountBadge/AmountBadge';
import { formatNumber } from '../../../common/utils';

export interface RevenueProps {
  income: number;
  outcome: number;
}

const Revenue: React.VFC<RevenueProps> = (props) => {
  const { income, outcome } = props;
  const it = formatNumber(income);
  const ot = formatNumber(outcome);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'revenue-popover' : undefined;
  const handleClick: React.MouseEventHandler = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <AmountBadge
        isIncome={income > outcome}
        amount={Math.abs(income - outcome)}
        onClick={handleClick}
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
        <Typography variant="body2" sx={{ padding: 1 }}>
          <Box sx={{ color: 'success.main' }} component="span">
            {it}
          </Box>
          &nbsp;/&nbsp;
          <Box sx={{ color: 'error.main' }} component="span">
            {ot}
          </Box>
        </Typography>
      </Popover>
    </>
  );
};

export default Revenue;
