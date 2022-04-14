import React from 'react';
import MuiPagination, { PaginationProps } from '@mui/material/Pagination';

const Pagination: React.FC<PaginationProps> = (props) => (
  <MuiPagination
    siblingCount={0}
    boundaryCount={2}
    variant="outlined"
    shape="rounded"
    size="small"
    sx={{
      '& .MuiButtonBase-root': {
        backgroundColor: 'background.paper',
      },
      '& .Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    }}
    {...props}
  />
);

export default Pagination;
