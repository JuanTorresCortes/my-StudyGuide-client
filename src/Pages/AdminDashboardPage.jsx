import React, { useState, useEffect } from "react";

import {
  CssBaseline,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import AdminNav from "../components/AdminNav";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../Api/api";
import { deleteUser } from "../Api/api";

const AdminDashboardPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openTestModal, setOpenTestModal] = useState(false);
  const [currentTestRecords, setCurrentTestRecords] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response && !response.error) {
        setAllUsers(response.data);
      } else {
        // Handle error case
        console.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only once on component mount

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteUser(selectedUserId);
    if (response && !response.error) {
      setAllUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== selectedUserId)
      );
      console.log(`Confirmed deletion for user ID: ${selectedUserId}`);
    } else {
      // Handle error case
      console.error("Failed to delete users");
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTestView = (tests) => {
    setCurrentTestRecords(tests);
    setOpenTestModal(true);
  };
  const handleCloseTestModal = () => {
    setOpenTestModal(false);
  };

  return (
    <Box>
      <CssBaseline />
      <AdminNav />
      <Grid container spacing={2} marginTop={4}>
        {allUsers.map((user, index) => (
          <Grid item key={index} xs={12} sm={6} md={2}>
            <UserCard
              name={`${user.firstName}  ${user.lastName}`}
              email={user.email}
              imageUrl={user.imageUrl}
              onTestView={() => handleTestView(user.testRecord)}
              onDelete={() => handleDeleteUser(user._id)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={openTestModal}
        onClose={handleCloseTestModal}
        aria-labelledby="test-modal-title"
        aria-describedby="test-modal-description"
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
          <Typography id="test-modal-title" variant="h6" component="h2">
            Test Records
          </Typography>
          <List id="test-modal-description">
            {currentTestRecords.map((test, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Test Topic: ${test.testTopic}`}
                  // secondary={`completion Date: ${test.createdAt}`}
                  secondary={`Score: ${test.score}, completion Date: ${test.createdAT}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboardPage;
