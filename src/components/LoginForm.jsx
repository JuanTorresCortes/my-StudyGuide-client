import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { loginUser } from '../Api/api'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let errorArray = [];

    const data = {
      email,
      password
    }

     const response = await loginUser(data)

     if (response.success === false) {
        const err = response.error;
        console.log(err)
        for (const item in err) {
            errorArray.push(err[item]);
        }
      }
      setErrors(errorArray);

      if(errorArray.length === 0){
       setEmail("");
       setPassword("");
        navigate('/')
      }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '300px',
        margin: '1em auto'
      }}
      onSubmit={handleLogin}
    >
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
