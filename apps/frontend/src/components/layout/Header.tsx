import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { clearAuth } from '../../store/authSlice';
import api from '../../services/api';

interface HeaderProps {
  drawerWidth: number;
}

const Header = ({ drawerWidth }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      dispatch(clearAuth());
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed', error);
      // Even if API fails, clear frontend state as a fallback
      dispatch(clearAuth());
      navigate('/login');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Sales Management
        </Typography>
        <Button color="inherit" onClick={handleLogout} disabled={logoutMutation.isPending}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;