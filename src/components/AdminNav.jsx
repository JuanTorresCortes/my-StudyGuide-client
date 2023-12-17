import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Modal, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // For the logout icon
import { removeUserToken } from "../Auth/authLocalStorage";

import { useNavigate } from "react-router-dom";

import TestUpLoadForm from "./TestUpLoadForm";

const AdminNav = ({ setAllTests, allTests }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      //setUserName(null);
      //setIsVerified(false);
      navigate("/");
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#151ad5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StudyLab
          </Typography>

          <Button
            color="inherit"
            onClick={() => navigate("/admin-Dashboard")}
            sx={{
              backgroundColor: "#151ad5", // Dark blue background
              color: "white", // White text
              borderRadius: 0, // Square edges
              "&:hover": {
                backgroundColor: "#c00000", // Slightly darker blue on hover
              },
            }}
          >
            Users
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/admin-test-bank")}
            sx={{
              backgroundColor: "#151ad5", // Dark blue background
              color: "white", // White text
              borderRadius: 0, // Square edges
              "&:hover": {
                backgroundColor: "#c00000", // Slightly darker blue on hover
              },
            }}
          >
            Tests
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminNav;
