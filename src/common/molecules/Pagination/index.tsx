import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiPagination, { PaginationProps } from '@material-ui/lab/Pagination';

export const Pagination = withStyles({
  root: {
    '& .MuiPaginationItem-page': {
      backgroundColor: '#fff',
    },
  },
})((props: PaginationProps) => (
  <MuiPagination
    siblingCount={0}
    boundaryCount={2}
    variant="outlined"
    shape="rounded"
    size="small"
    {...props}
  />
));