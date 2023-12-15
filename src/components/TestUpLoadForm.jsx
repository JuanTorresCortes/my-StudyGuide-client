import React, { useState } from "react";
import { uploadTest } from "../Api/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const TestUpLoadForm = ({ setModalOpen }) => {
  const [testTopic, setTestTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [testKey, setTestKey] = useState("");
  const [pdf, setPdf] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("testTopic", testTopic);
    formData.append("grade", grade);
    formData.append("testKey", testKey);
    formData.append("pdf", pdf);
    console.log(formData);
    try {
      const result = await uploadTest(formData);
      if (result.success === true) {
        setTestTopic("");
        setGrade("");
        setTestKey("");
        setPdf(null);
        setModalOpen(false);
        navigate("/admin-test-bank");
      }
    } catch (error) {
      console.error("Error uploading test:", error);
      // Handle error (show error message to the user)
    }
  };

  const handlePdfChange = (event) => {
    setPdf(event.target.files[0]);
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
        Upload Test Form
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="test-topic-label">Test Topic</InputLabel>
        <Select
          labelId="test-topic-label"
          id="testTopic"
          value={testTopic}
          label="Test Topic"
          onChange={(e) => setTestTopic(e.target.value)}
          required
        >
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Reading">Reading</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="test-topic-label">Test Grade</InputLabel>
        <Select
          value={grade}
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
        value={testKey}
        onChange={(e) => setTestKey(e.target.value)}
      />
      <br />
      <Button variant="contained" component="label">
        Upload PDF
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={handlePdfChange}
          name="pdfData"
        />
      </Button>
      <br />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default TestUpLoadForm;
