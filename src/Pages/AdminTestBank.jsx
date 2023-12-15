import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getAllTests, deleteTest } from "../Api/api";
import TestCard from "../components/TestCard";

const AdminTestBank = () => {
  const [allTests, setAllTests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      const response = await getAllTests();
      if (response && !response.error) {
        setAllTests(response.data);
        console.log(allTests);
      } else {
        // Handle error case
        console.error("Failed to fetch tests");
      }
    };

    fetchTests();
  }, []); // Empty dependency array to run only once on component mount

  const handleDeleteTest = (userId) => {
    setSelectedTestId(userId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteTest(selectedTestId);
    if (response && !response.error) {
      setAllTests((currentTest) =>
        currentTest.filter((test) => test._id !== selectedTestId)
      );
      console.log(`Confirmed deletion for test ID: ${selectedTestId}`);
      navigate("/admin-test-bank");
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
        {allTests.map((test, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <TestCard
              id={`${test._id}`}
              topic={`${test.testTopic}`}
              grade={`${test.grade}`}
              createdAt={`${test.createdAt}`}
              onDelete={() => handleDeleteTest(test._id)}
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
            Are you sure you want to delete this test?
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

export default AdminTestBank;
