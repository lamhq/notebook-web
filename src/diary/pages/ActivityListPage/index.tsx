import React from 'react';
// import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ActivityList } from '../../organisms/ActivityList';
import { Pagination } from '../../../common/molecules/Pagination';
import { IconButton } from '../../../common/atoms/Button';
import { Revenue } from '../../atoms/Revenue';
import { HorzItems } from '../../../common/atoms/HorzItems';
import { ActivitySearchDialog } from '../../organisms/ActivitySearchDialog';

// const useStyles = makeStyles(() =>
//   createStyles({
//     section: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '10px',
//     },
//   }),
// );

const models = [
  {
    id: '1',
    time: '2021-06-15T01:21:03.368Z',
    tags: ['play', 'gog'],
    income: 100.0,
    outcome: 0,
    content:
      'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
  },
  {
    id: '2',
    time: '2021-06-15T01:20:03.368Z',
    tags: ['play'],
    income: 0,
    outcome: 123.0,
    content: 'Nemo enim ipsam voluptatem',
  },
  {
    id: '3',
    time: '2021-06-15T01:19:03.368Z',
    tags: ['nec'],
    income: 0,
    outcome: 230.0,
    content: 'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
  },
  {
    id: '4',
    time: '2021-06-14T01:21:03.368Z',
    tags: ['play', 'gog'],
    income: 100.0,
    outcome: 0,
    content:
      'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
  },
  {
    id: '5',
    time: '2021-06-14T01:20:03.368Z',
    tags: ['play'],
    income: 0,
    outcome: 123.0,
    content: 'Nemo enim ipsam voluptatem',
  },
  {
    id: '6',
    time: '2021-06-13T01:19:03.368Z',
    tags: ['nec'],
    income: 0,
    outcome: 230.0,
    content: 'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
  },
];

const ActivityListPage: React.VFC = () => {
  // const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      <Grid container justify="space-between" spacing={0}>
        <HorzItems>
          <IconButton color="primary">
            <AddCircleIcon />
          </IconButton>
          <ActivitySearchDialog />
        </HorzItems>
        <Revenue income={400} outcome={120} />
      </Grid>
      <ActivityList models={models} />
      <Pagination page={page} onChange={handleChange} count={10} />
    </>
  );
};

export default ActivityListPage;
