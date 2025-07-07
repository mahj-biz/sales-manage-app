import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
  drawerWidth: number;
}

const Sidebar = ({ drawerWidth }: SidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Dashboard Link */}
          <ListItem disablePadding component={Link} to="/dashboard" sx={{ color: 'inherit' }}>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          {/* Future links will go here */}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;