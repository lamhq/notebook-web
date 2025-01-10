import BookIcon from '@mui/icons-material/Book';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import TimelineIcon from '@mui/icons-material/Timeline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import MuiListItemIcon, {
  type ListItemIconProps,
} from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';

function ListItemIcon(props: ListItemIconProps) {
  return <MuiListItemIcon sx={{ minWidth: 40 }} {...props} />;
}

export default function Sidebar() {
  const logout = () => null;
  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Diary" />
          <ExpandLess />
        </ListItem>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/" sx={{ paddingLeft: 4 }}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItemButton>
        </List>
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </>
  );
}
