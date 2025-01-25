import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { type MouseEventHandler, useCallback, useState } from 'react';
import AmountBadge from '../../../common/atoms/AmountBadge/AmountBadge';
import Typography from '../../../common/atoms/Typography/Typography';
import { formatNumber } from '../../../common/utils';

export type RevenueProps = {
  income: number;
  outcome: number;
}

export default function Revenue({ income, outcome }: RevenueProps) {
  const it = formatNumber(income);
  const ot = formatNumber(outcome);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'revenue-popover' : undefined;
  const handleClick: MouseEventHandler = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
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
}
