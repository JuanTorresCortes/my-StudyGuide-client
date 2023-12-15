import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { setUserToken } from "../Auth/authLocalStorage";
import { loginAdmin } from "../Api/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let errorArray = [];

    if (!email.trim()) errorArray.push("Email is required");
    if (!password.trim()) errorArray.push("Password is required");
    if (!key.trim()) errorArray.push("Key is required");

    if (errorArray.length > 0) {
      setErrors(errorArray);
      setOpenDialog(true);
      return;
    }

    const data = { email, password, key };
    const loginResult = await loginAdmin(data);

    if (loginResult && loginResult.success) {
      setUserToken(loginResult.token);
      setEmail("");
      setPassword("");
      setKey("");
      setErrors([]);
      navigate("/admin-Dashboard");
    } else {
      setErrors(
        loginResult.error ? Object.values(loginResult.error) : ["Unknown error"]
      );
      setOpenDialog(true);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 1 }}>
      <CssBaseline />

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="key"
        label="Key"
        type="password"
        id="key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>

      {/* Error Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          {errors.map((error, index) => (
            <DialogContentText key={index}>{error}</DialogContentText>
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

export default AdminLogin;
