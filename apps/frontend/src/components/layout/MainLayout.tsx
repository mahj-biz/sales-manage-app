import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <Header drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px', // Offset for the header height
        }}
      >
        {/* The actual page content (e.g., DashboardPage) will be rendered here */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;