import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '300px',
        margin: '1em auto',
        border: "2px solid black",
        padding: "12px",
        backgroundColor: "rgb(55, 133, 212)",
        boxShadow: 15
      }}
      onSubmit={handleOnSubmit}
    >
      Dev password: Battaglia8! 
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
