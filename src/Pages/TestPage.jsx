import React,{useState, useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import ScanTron from '../components/ScanTron';
import PDFViewerTest from '../components/PDFViewerTest';
import { Grid, Container } from '@mui/material';
import {getTestKey} from '../Api/api'

const TestPage = () => {
  const [testKey, setTestKey] = useState(null)
  const { userInfo, test } = useOutletContext();

  // Since `test` is an array, access the first element to get the desired object.
  const currentTest = test[0];
  const { pdfData, testKeyID } = currentTest;

  useEffect(()=>{
    const getKey = async () => {
      const myKey = await getTestKey(testKeyID)
      if(myKey.success === true){
        setTestKey(myKey)
        //console.log(key)
      }
    }
    getKey()
  },[test])

  return (
    <div className='test-setup'>
      <Container style={{ marginTop: '80px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PDFViewerTest pdfData={pdfData.data} />
          </Grid>
        </Grid>
      </Container>

      <Container style={{ marginTop: '80px' }}>
        <Grid item xs={12} md={6}>
          <ScanTron testKey={testKey}/>
        </Grid>
      </Container>
    </div>
  );
};

export default TestPage;
