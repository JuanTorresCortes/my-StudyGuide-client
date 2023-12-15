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
} from "@mui/material";

import AdminNav from "../components/AdminNav";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../Api/api";
import { deleteUser } from "../Api/api";

const AdminDashboardPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  return (
    <Box>
      <CssBaseline />
      <AdminNav />
      <Grid container spacing={2} marginTop={4}>
        {allUsers.map((user, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <UserCard
              name={`${user.firstName}  ${user.lastName}`}
              email={user.email}
              testRecord={user.testRecord}
              imageUrl={user.imageUrl}
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
    </Box>
  );
};

export default AdminDashboardPage;
