import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  Fade,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // For the logout icon
import { removeUserToken } from "../Auth/authLocalStorage";

import { useNavigate } from "react-router-dom";
import AdminRegisterForm from "./AdminRegisterForm";

const AdminNav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button
            color="inherit"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#151ad5", // Dark blue background
              color: "white", // White text
              borderRadius: 0, // Square edges
              "&:hover": {
                backgroundColor: "#c00000", // Slightly darker blue on hover
              },
            }}
          >
            Register Admin
          </Button>
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

      {/* Register Form Modal */}
      <Modal
        aria-labelledby="registration-form-modal"
        aria-describedby="modal-to-register-new-users"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 14,
              outline: "none", // Removes the default focus outline
            }}
          >
            <AdminRegisterForm setOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AdminNav;
