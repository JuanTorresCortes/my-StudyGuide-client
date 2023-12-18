import React, { useState } from "react";
import { editTest } from "../Api/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const TestEditForm = ({ handleClose, refetchTests, testData }) => {
  const { _id: testId } = testData;

  const [editTestTopic, setTestTopic] = useState(testData.testTopic);
  const [editGrade, setGrade] = useState(testData.grade);
  const [editTestKey, setTestKey] = useState(testData.testKey);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      testTopic: editTestTopic,
      grade: editGrade,
      testKey: editTestKey,
    };

    try {
      const result = await editTest(testId, formData);
      if (result.success === true) {
        await refetchTests();
        handleClose();
      }
    } catch (error) {
      console.error("Error uploading test:", error);
      // Handle error (show error message to the user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1 } }} // width: "25ch"
    >
      <Typography variant="h6" gutterBottom>
        Edit Test Form Test id: {testId}
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="test-topic-label">Test Topic</InputLabel>
        <Select
          labelId="test-topic-label"
          id="editTestTopic"
          value={editTestTopic}
          label="Test Topic"
          onChange={(e) => setTestTopic(e.target.value)}
          required
        >
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Reading">Reading</MenuItem>
          <MenuItem value="SocialStudies">Social Studies</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="test-topic-label">Test Grade</InputLabel>
        <Select
          value={editGrade}
          label="Test grade"
          onChange={(e) => setGrade(e.target.value)}
          required
        >
          <MenuItem value="1">1st</MenuItem>
          <MenuItem value="2">2nd</MenuItem>
          <MenuItem value="3">3rd</MenuItem>
          <MenuItem value="4">4th</MenuItem>
          <MenuItem value="5">5th</MenuItem>
          <MenuItem value="6">6th</MenuItem>
          <MenuItem value="7">7th</MenuItem>
          <MenuItem value="8">8th</MenuItem>
        </Select>
      </FormControl>

      <TextField
        required
        fullWidth
        label="Test Key"
        value={editTestKey}
        onChange={(e) => setTestKey(e.target.value)}
      />

      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default TestEditForm;
