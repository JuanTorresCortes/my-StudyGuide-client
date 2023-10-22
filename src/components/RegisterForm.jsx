import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Button, TextField, Grid, Box, Typography, Container, Link, List, ListItem, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {registerUser} from '../Api/api'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [password, setPassword] = useState("");
  const [varPassword, setVarPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let errorArray = [];

    if (!firstName.trim()) {
      errorArray.push("First name is required");
    }

    if (!lastName.trim()) {
      errorArray.push("Last name is required");
    }

    if (!email.trim()) {
      errorArray.push("Email is required");
    }

    if (!gradeLevel.trim()) {
      errorArray.push("GradLevel is required");
    }

    if (!password.trim()) {
      errorArray.push("Password is required");
    }

    if (password !== varPassword) {
      errorArray.push("Passwords do not match");
    }

    const userData = {
      firstName,
      lastName,
      gradeLevel,
      email,
      password
    }

      const response = await registerUser(userData);

      if (response.success === false) {
        const err = response.error;
        console.log(err)
        for (const item in err) {
            errorArray.push(err[item]);
        }
    }
    

    setErrors(errorArray);

          
      if(errorArray.length === 0){
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        navigate('/login')
      }
    }

  return (
    <Container component="main" maxWidth="xs">
      <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0', // Use padding for a bit of spacing
      width: '100%',    // Ensure the box takes the full width
      height: '15em'
    }}
  >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h3" variant="h5" sx={{ mb: 1 }}>
          Sign Up
        </Typography>

        {errors.length > 0 && (
          <List>
            {errors.map((error, index) => (
              <ListItem key={index} style={{ color: 'red' }}>
                {error}
              </ListItem>
            ))}
          </List>
        )}

        <Box component="form" noValidate onSubmit={handleOnSubmit} >
          <Grid container spacing={.3}>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="small"
                size="small"
                label='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="small"
                size="small"
                label='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="small"
                size="small"
                label='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl 
                fullWidth  
                margin="small"
                size="small">
                <InputLabel>Select Grade Level</InputLabel>
                <Select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="5th">5th grade</MenuItem>
                  <MenuItem value="6th">6th grade</MenuItem>
                  <MenuItem value="7th">7th grade</MenuItem>
                  <MenuItem value="8th">8th grade</MenuItem>
                  <MenuItem value="9th">9th grade</MenuItem>
                  <MenuItem value="10th">10th grade</MenuItem>
                  <MenuItem value="11th">11th grade</MenuItem>
                  <MenuItem value="12th">12th grade</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="small"
                size="small"
                type='password'
                label='Create password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="small"
                size="small"
                type='password'
                label='Verify password'
                value={varPassword}
                onChange={(e) => setVarPassword(e.target.value)}
                required
              />
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
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    
);
}

export default RegisterForm;


//   _id: { type: String, default: uuid },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//     unique: true,
//   },
//   gradeLevel: {
//     type: String,
//     enum: ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
//     required: true,
//   },
//   passwordHash: { type: String, required: true },
//   testRecord: [completedTestSchema],
