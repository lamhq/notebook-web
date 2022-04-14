import React from 'react';
import Chip from '@mui/material/Chip';
import { formatNumber } from '../../utils';

export interface AmountProps {
  isIncome: boolean;
  amount: number;
  onClick?: React.MouseEventHandler;
}

const AmountBadge: React.FC<AmountProps> = ({ isIncome: income, amount, onClick }) => (
  <Chip
    label={formatNumber(amount)}
    size="small"
    onClick={onClick}
    sx={{
      bgcolor: income ? 'success.main' : 'error.main',
      color: '#fff',
      borderRadius: '3px',
      '&.MuiChip-sizeSmall': {
        height: 'auto',
        fontSize: '0.6875rem',
      },
      '& .MuiChip-labelSmall': {
        padding: '2px 6px',
      },
    }}
  />
);

AmountBadge.defaultProps = {
  onClick: undefined,
};

export default AmountBadge;
