import React from 'react';
import LoginForm from '../components/LoginForm';
import { Box, Grid, CssBaseline, Paper } from '@mui/material';

const LoginPage = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh"}}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage;
