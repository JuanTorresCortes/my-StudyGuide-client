import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { updateUser } from "../Api/api";

const UserUpdateForm = ({ handleClose, userInfo }) => {
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [gradeLevel, setGradeLevel] = useState(userInfo.gradeLevel);

  const [errors, setErrors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let errorArray = [];

    if (!firstName.trim()) errorArray.push("First name is required");
    if (!lastName.trim()) errorArray.push("Last name is required");
    if (!gradeLevel.trim()) errorArray.push("Grade level is required");

    if (errorArray.length === 0) {
      const userData = {
        firstName,
        lastName,
        gradeLevel,
      };

      const response = await updateUser(userInfo._id, userData);

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
      setGradeLevel("");
      navigate(0);
      handleClose();
    } else {
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
          height: "15em",
        }}
      >
        <Typography component="h3" variant="h5" sx={{ mb: 1 }}>
          Update profile
        </Typography>

        <Box component="form" noValidate onSubmit={handleOnSubmit}>
          <Grid container spacing={0.3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
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
                margin="normal"
                size="small"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>Select Grade Level</InputLabel>
                <Select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="3">3rd grade</MenuItem>
                  <MenuItem value="4">4th grade</MenuItem>
                  <MenuItem value="5">5th grade</MenuItem>
                  <MenuItem value="6">6th grade</MenuItem>
                  <MenuItem value="7">7th grade</MenuItem>
                  <MenuItem value="8">8th grade</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            margin="small"
            size="small"
          >
            Update
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

export default UserUpdateForm;
