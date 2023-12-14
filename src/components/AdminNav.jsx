import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TestUpLoadForm from "./TestUpLoadForm";

const AdminNav = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#151ad5" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StudyLab
          </Typography>
          <Button color="inherit" onClick={handleModalToggle}>
            Upload Test
          </Button>
          <Button color="inherit">Log Out</Button>
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
          <TestUpLoadForm />
        </Box>
      </Modal>
    </>
  );
};

export default AdminNav;
