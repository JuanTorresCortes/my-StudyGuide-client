import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MathLab
        </Typography>
        <Button color="inherit" onClick={ () => navigate('/') }>home</Button>
        <Button color="inherit" onClick={ () => navigate('/login') }>Login</Button>
        <Button color="inherit" onClick={ () => navigate('/test') }>Test Page</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
