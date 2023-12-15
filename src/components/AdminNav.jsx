import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Modal, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // For the logout icon
import { removeUserToken } from "../Auth/authLocalStorage";

import { useNavigate } from "react-router-dom";

import TestUpLoadForm from "./TestUpLoadForm";

const AdminNav = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    //setShouldRefresh(true);

    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      //setShouldRefresh(false);
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

          <Button color="inherit" onClick={handleModalToggle}>
            Upload Test
          </Button>

          <Button color="inherit" onClick={() => navigate("/admin-Dashboard")}>
            Users
          </Button>

          <Button color="inherit" onClick={() => navigate("/admin-test-bank")}>
            Tests
          </Button>

          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Modal
        open={isModalOpen}
        onClose={handleModalToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <TestUpLoadForm setModalOpen={setModalOpen} />
        </Box>
      </Modal>
    </>
  );
};

export default AdminNav;
