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

const TestUpLoadForm = () => {
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
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
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

      <TextField
        required
        label="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />

      <TextField
        required
        label="Test Key"
        value={testKey}
        onChange={(e) => setTestKey(e.target.value)}
      />

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

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default TestUpLoadForm;
