import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { registerAdmin } from "../Api/api";

const AdminRegisterForm = ({ setOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [varPassword, setVarPassword] = useState("");
  const [key, setKey] = useState("");

  const [errors, setErrors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let errorArray = [];

    if (!firstName.trim()) errorArray.push("First name is required");
    if (!lastName.trim()) errorArray.push("Last name is required");
    if (!email.trim()) errorArray.push("Email is required");
    if (!password.trim()) errorArray.push("Password is required");
    if (password !== varPassword) errorArray.push("Passwords do not match");
    if (!key.trim()) errorArray.push("Key is required");

    if (errorArray.length === 0) {
      const adminData = {
        firstName,
        lastName,
        email,
        password,
        key,
      };

      const response = await registerAdmin(adminData);

      if (response && response.success === false) {
        const err = response.error;
        for (const item in err) {
          errorArray.push(err[item]);
        }
      }
    }

    setErrors(errorArray);

    if (errorArray.length === 0) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVarPassword("");
      setKey("");
      setOpen(false);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVarPassword("");
      setKey("");
      setOpenDialog(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0",
          width: "100%",
          height: "17em",
        }}
      >
        <Typography component="h3" variant="h5" sx={{ mb: 1 }}>
          Sign Up new admin
        </Typography>

        <Box component="form" noValidate onSubmit={handleOnSubmit}>
          <Grid container spacing={0.3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                type="password"
                label="Verify password"
                value={varPassword}
                onChange={(e) => setVarPassword(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                type="password"
                label="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            margin="dense"
            size="small"
          >
            Register
          </Button>
        </Box>

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
    </Container>
  );
};

export default AdminRegisterForm;
