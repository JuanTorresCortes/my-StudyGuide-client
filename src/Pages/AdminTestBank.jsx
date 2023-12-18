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
  Modal,
} from "@mui/material";
import AdminNav from "../components/AdminNav";
import { getAllTests, deleteTest } from "../Api/api";
import TestCard from "../components/TestCard";
import TestUpLoadForm from "../components/TestUpLoadForm";
import TestEditForm from "../components/TestEditForm";

const AdminTestBank = () => {
  const [allTests, setAllTests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editTestData, setEditTestData] = useState([]);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const handleEditModalToggle = () => {
    setEditModalOpen(!isEditModalOpen);
  };

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
  }, []);

  const handleDeleteTest = (testId) => {
    setSelectedTestId(testId);
    setOpenDialog(true);
  };

  // const handleEditTest = (testId) => {
  //   setSelectedTestId(testId);
  //   setEditModalOpen(true);
  // };

  const handleEditTest = (testId) => {
    setSelectedTestId(testId);
    const selectedTest = allTests.find((test) => test._id === testId);
    if (selectedTest) {
      // Assuming setEditTestData is a state setter for storing the selected test data
      setEditTestData(selectedTest);
      setEditModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    const response = await deleteTest(selectedTestId);
    if (response && !response.error) {
      setAllTests((currentTest) =>
        currentTest.filter((test) => test._id !== selectedTestId)
      );
      console.log(`Confirmed deletion for test ID: ${selectedTestId}`);
      //navigate("/admin-test-bank");
    } else {
      // Handle error case
      console.error("Failed to delete users");
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const refetchTests = async () => {
    const response = await getAllTests();
    if (response && !response.error) {
      setAllTests(response.data);
    } else {
      console.error("Failed to fetch tests");
    }
  };

  return (
    <Box>
      <CssBaseline />
      <AdminNav />

      <Button
        onClick={handleModalToggle}
        sx={{
          marginTop: 8,
          backgroundColor: "#151ad5", // Dark blue background
          color: "white", // White text
          borderRadius: 0, // Square edges
          "&:hover": {
            backgroundColor: "#c00000", // Slightly darker blue on hover
          },
        }}
      >
        Upload Test
      </Button>

      <Grid container spacing={2} marginTop={4}>
        {allTests.map((test, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <TestCard
              id={`${test._id}`}
              topic={`${test.testTopic}`}
              grade={`${test.grade}`}
              createdAt={`${test.createdAt}`}
              onEditTest={() => handleEditTest(test._id)}
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
          <TestUpLoadForm
            setModalOpen={setModalOpen}
            refetchTests={refetchTests}
          />
        </Box>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={handleEditModalToggle}
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
          {/* <TestEditForm
            setModalOpen={setEditModalOpen}
            refetchTests={refetchTests}
            testId={selectedTestId}
          /> */}
          <TestEditForm
            isOpen={isEditModalOpen}
            handleClose={() => setEditModalOpen(false)}
            testData={editTestData}
            refetchTests={refetchTests}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminTestBank;
