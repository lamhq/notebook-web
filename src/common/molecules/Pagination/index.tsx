import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiPagination, { PaginationProps as MuiPaginationProps } from '@material-ui/lab/Pagination';
import MuiPaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles({
  item: {
    backgroundColor: '#fff',
  },
});

export type PaginationProps = MuiPaginationProps;

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const classes = useStyles();
  return (
    <MuiPagination
      siblingCount={0}
      boundaryCount={2}
      variant="outlined"
      shape="rounded"
      size="small"
      renderItem={(item) => <MuiPaginationItem {...item} classes={{ page: classes.item }} />}
      {...props}
    />
  );
};

export default Pagination;
