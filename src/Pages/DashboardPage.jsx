import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Typography, Divider, Container, Box } from '@mui/material';
import TestSelect from '../components/TestSelect';

const DashboardPage = () => {
  const [grade, setGrade] = useState("");
  

  const { userInfo, setTest} = useOutletContext()
  const { gradeLevel } = userInfo;

  useEffect(() => {
    setGrade(gradeLevel);
  }, [gradeLevel]);
  
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Divider variant="middle" />
        <Box my={3}>
          <Typography variant="h6" gutterBottom>
            Test Selection
          </Typography>
          <TestSelect grade={grade} setTest={setTest} />
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;
