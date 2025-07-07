import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../store/authSlice';
import api from '../services/api';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

// A simplified login page component using MUI and React Hook Form
const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post('/auth/login', data),
    onSuccess: (response) => {
      // The backend sets the HttpOnly cookie.
      // We just need to update the frontend state.
      dispatch(setAuth({ email: response.data.email }));
      navigate('/dashboard'); // Redirect to a protected page
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Here you would show an error message to the user
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;