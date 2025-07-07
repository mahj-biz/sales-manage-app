import { Box, Typography } from '@mui/material';

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography variant="body1">
        This is a protected page. You can only see this if you are logged in.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        In future phases, this page will be populated with charts and key metrics.
      </Typography>
    </Box>
  );
};

export default DashboardPage;