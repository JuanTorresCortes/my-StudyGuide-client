import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  TextField, Button, Typography, Box, Avatar, Link, Grid, CssBaseline,
  FormControlLabel, Checkbox
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginUser } from '../Api/api'
import {setUserToken} from '../Auth/authLocalStorage'

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const { setShouldRefresh} = useOutletContext()

  // const { setShouldRefresh } = useOutletContext();
  const navigate = useNavigate();

  // Function to handle form submission when the user clicks the submit button
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // ⚠️ From App.js => const { setShouldRefresh } = useOutletContext(); ⚠️
     setShouldRefresh(true);

    // Create a data object with the email and password to be sent to the server
    const data = {
      email,
      password,
    };

    // Call the API function to login the user with the provided data
    // ⚠️import { loginUser } from "../Api/api"⚠️;
    const loginResult = await loginUser(data);

    if (loginResult.success) {
      // If the login is successful, set the user token in local storage, reset the email and password states, and navigate to the home page
      // ⚠️ import { setUserToken } from "../Auth/authLocalStorage"; ⚠️
       setUserToken(loginResult.token);
      setEmail("");
      setPassword("");
      setError({});
      navigate("/Dashboard");
    } else {
      // If there are errors in the login response, set the error state to display the error messages
      setError(loginResult.error);
    }

    setShouldRefresh(false); // Set the
  
  }
  return (
  <Box
  component="form"
  noValidate
  onSubmit={handleOnSubmit}
  sx={{ mt: 1 }}
>
  <CssBaseline />
  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
    Sign in
  </Typography>
  {error && (
    <Typography variant="body2" style={{ color: 'red' }}>
      {error}
    </Typography>
  )}
  <TextField
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    autoFocus
  />
  <TextField
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    autoComplete="current-password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  {/* <FormControlLabel
    control={<Checkbox value="remember" color="primary" />}
    label="Remember me"
  /> */}
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    Sign In
  </Button>
  <Grid container>
    {/* <Grid item xs>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </Grid> */}
    <Grid item>
      <Link href="/" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
</Box>
  );
};

export default LoginForm;
