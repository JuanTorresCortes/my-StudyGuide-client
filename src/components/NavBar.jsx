import React from "react";
import { useNavigate } from "react-router-dom";
import { removeUserToken } from "../Auth/authLocalStorage";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // For the logout icon

const NavBar = ({
  isVerified,
  setIsVerified,
  userName,
  setUserName,
  setShouldRefresh,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    setShouldRefresh(true);

    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      setShouldRefresh(false);
      setUserName(null);
      setIsVerified(false);
      navigate("/");
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#151ad5" }}>
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
          sx={{ fontWeight: 700 }}
        >
          StudyLab
        </Typography>
        {isVerified ? (
          <>
            <IconButton color="inherit">
              <Avatar>{userName.charAt(0)}</Avatar>{" "}
              {/* Displaying the first letter of userName */}
            </IconButton>
            <Typography variant="body1" style={{ marginRight: "1rem" }}>
              {userName}
            </Typography>
            <Button
              onClick={() => navigate("/archive")}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              Test Archive
            </Button>
            <Button
              onClick={() => navigate("/Dashboard")}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              Back to Dashboard
            </Button>
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
