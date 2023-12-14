import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Link,
  Grid,
  CssBaseline,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { setUserToken } from "../Auth/authLocalStorage";
import { loginAdmin } from "../Api/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");

  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the email and password to be sent to the server
    const data = {
      email,
      password,
      key,
    };

    const loginResult = await loginAdmin(data);

    if (loginResult.success) {
      // If the login is successful, set the user token in local storage, reset the email and password states, and navigate to the home page
      // ⚠️ import { setUserToken } from "../Auth/authLocalStorage"; ⚠️
      setUserToken(loginResult.token);
      setEmail("");
      setPassword("");
      setKey("");
      setError({});
      navigate("/admin-Dashboard");
    } else {
      // If there are errors in the login response, set the error state to display the error messages
      setError(loginResult.error);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 1 }}>
      <CssBaseline />

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {error && (
        <Typography variant="body2" style={{ color: "red" }}>
          {error.data}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="key"
        label="key"
        type="password"
        id="key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

export default AdminLogin;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   CircularProgress,
//   CssBaseline,
// } from "@mui/material";
// import { setUserToken } from "../Auth/authLocalStorage";
// import { loginAdmin } from "../Api/api";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [key, setKey] = useState("");
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = { email, password, key };
//     const loginResult = await loginAdmin(data);

//     if (loginResult.success) {
//       setUserToken(loginResult.token);
//       setEmail("");
//       setPassword("");
//       setKey("");
//       setError({});
//       navigate("/admin-Dashboard");
//     } else {
//       setError(loginResult.error);
//     }

//     setLoading(false);
//   };

//   return (
//     <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 1 }}>
//       <CssBaseline />
//       {/* ...form elements, including TextField for email, password, and key */}

//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="email"
//         label="Email Address"
//         name="email"
//         autoComplete="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         autoFocus
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         name="password"
//         label="Password"
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         name="key"
//         label="key"
//         type="password"
//         id="key"
//         value={key}
//         onChange={(e) => setKey(e.target.value)}
//       />

//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         sx={{ mt: 3, mb: 2 }}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : "Sign In"}
//       </Button>
//       {error && (
//         <Typography variant="body2" style={{ color: "red" }}>
//           {error}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default AdminLogin;
