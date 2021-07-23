import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import MuiPagination, { PaginationProps } from '@material-ui/lab/Pagination';

const Pagination = withStyles((theme: Theme) => ({
  root: {
    '& .MuiPaginationItem-page': {
      backgroundColor: theme.palette.background.paper,
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}))((props: PaginationProps) => (
  <MuiPagination
    siblingCount={0}
    boundaryCount={2}
    variant="outlined"
    shape="rounded"
    size="small"
    {...props}
  />
));

export default Pagination;
