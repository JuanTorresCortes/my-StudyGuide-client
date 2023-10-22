import React from 'react';
import { Typography, Divider, Container, Box } from '@mui/material';
import TestSelect from '../components/TestSelect';

const DashboardPage = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Divider variant="middle" />
        <Box my={3}>
          <Typography variant="h6" gutterBottom>
            Test Selection
          </Typography>
          <TestSelect />
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;
