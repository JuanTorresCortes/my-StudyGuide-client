import React,{useState,useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { getCompletedTest } from '../Api/api'
import { Card, CardContent, Typography, Container, Grid, Button} from '@mui/material';

const TestArchive = () => {
const {userInfo, setShouldRefresh} = useOutletContext()
const {_id} = userInfo

const navigate = useNavigate()

const [completedTests, setCompletedTests] = useState([]);

useEffect(() => {
    // Fetch completed tests on component mount
    const fetchCompletedTests = async () => {
      try {
        const response = await getCompletedTest(_id); 
        console.log("Fetched completed tests:", response.data);
        setCompletedTests(response.data.completedTests);
      } catch (error) {
        console.error("Error fetching completed tests:", error);
      }
    };

    fetchCompletedTests();
  }, []);


  return (
    <Container style={{ marginTop: '2em' }}>
    <h3>Test Archive</h3>
    <Button onClick={() => navigate("/Dashboard")}>Back to Dashboard</Button>
    <Grid container spacing={3}> {/* This is the Grid container */}
      {completedTests.slice().reverse().map((test) => (  // Use slice() to create a copy of the array, then reverse() to reverse its order
        <Grid item xs={12} sm={6} md={12} key={test._id}>
          <Card elevation={12}>
            <CardContent>
              <Typography variant="h6">Topic: {test.testTopic}</Typography>
              <Typography>Score: {test.score}</Typography>
              <Typography>Date: {new Date(test.createdAT).toLocaleDateString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>

  )
}

export default TestArchive 