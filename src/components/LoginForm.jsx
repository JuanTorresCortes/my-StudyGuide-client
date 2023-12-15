import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Link,
  Grid,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser } from "../Api/api";
import { setUserToken } from "../Auth/authLocalStorage";

const LoginForm = ({ handleOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const { setShouldRefresh } = useOutletContext();

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setShouldRefresh(true);

    let errorArray = [];

    if (!email.trim()) errorArray.push("Email is required.");
    if (!password.trim()) errorArray.push("Password is required.");

    setErrors(errorArray);

    if (errorArray.length > 0) {
      setOpenDialog(true);
      return; // Stop the execution if there are initial validation errors.
    }

    // If initial validations pass, proceed to login.
    try {
      const loginResult = await loginUser({ email, password });

      if (loginResult && loginResult.success) {
        setUserToken(loginResult.token);
        setEmail("");
        setPassword("");
        setShouldRefresh(false);
        navigate("/Dashboard");
      } else {
        // Handle the case where login is unsuccessful due to server-side validation.
        errorArray = [
          ...errorArray,
          ...(loginResult.error || [
            "Login failed. Email or password did not match. Please try again.",
          ]),
        ];
        setErrors(errorArray);
        setOpenDialog(true);
      }
    } catch (error) {
      // Handle the case where an exception occurred during the login process.
      errorArray.push(
        "An error occurred during login. Email or password did not match. Please try again."
      );
      setErrors(errorArray);
      setOpenDialog(true);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 1 }}>
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <Button onClick={handleOpen}>Don't have an account? Sign Up</Button>
        </Grid>
      </Grid>

      {/* Error Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          {errors.map((err, index) => (
            <DialogContentText key={index}>{err}</DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginForm;
