import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate, Navigate } from "react-router-dom";
import { getCompletedTest, deleteCompletedTest } from "../Api/api";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  CardMedia,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const imgSrc =
  "data:image/png;base64,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";

const TestArchive = () => {
  const { userInfo } = useOutletContext();
  const { _id } = userInfo;

  const [completedTests, setCompletedTests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedTests = async () => {
      if (!_id) {
        // Handle the case where _id is not available
        console.log("User ID not available for fetching tests.");
        return;
      }
      try {
        const response = await getCompletedTest(_id);
        setCompletedTests(response.data.completedTests);
      } catch (error) {
        console.error("Error fetching completed tests:", error);
      }
    };
    fetchCompletedTests();
  }, [_id]); // Add _id as a dependency

  const handleDeleteTest = (testId) => {
    setSelectedTestId(testId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteCompletedTest(userInfo._id, selectedTestId);
    if (response && !response.error) {
      navigate(0);
      console.log(`Confirmed deletion for test ID: ${selectedTestId}`);
      //navigate("/admin-test-bank");
    } else {
      // Handle error case
      console.error("Failed to delete test");
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <CssBaseline />
      <h3>Test Archive</h3>

      <Grid container spacing={2} marginTop={4}>
        {" "}
        {/* This is the Grid container */}
        {completedTests
          .slice()
          .reverse()
          .map(
            (
              test // Use slice() to create a copy of the array, then reverse() to reverse its order
            ) => (
              <Grid item xs={12} sm={6} md={4} key={test._id}>
                <Card elevation={12}>
                  <CardContent>
                    <CardMedia
                      component="img"
                      sx={{ maxHeight: 200, objectFit: "cover" }}
                      image={imgSrc}
                    />
                    <Typography variant="h6">{test.testTopic}</Typography>
                    <Typography>Score: {test.score}</Typography>
                    <Typography>
                      Date: {new Date(test.createdAT).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteTest(test._id)}
                    sx={{ marginBottom: 2 }}
                  >
                    Delete Test
                  </Button>
                </Card>
              </Grid>
            )
          )}
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
    </Container>
  );
};

export default TestArchive;
