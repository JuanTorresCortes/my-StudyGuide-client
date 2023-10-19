import React from 'react'
import ScanTron from '../components/ScanTron';
import PDFViewerTest from '../components/PDFViewerTest';
import pdfFile from '../PDF/pdfFile.pdf';
import { Grid, Container } from '@mui/material';

const TestPage = () => {
  return (
    <div className='test-setup'>

      <Container style={{ marginTop: '80px' }}>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PDFViewerTest file={pdfFile} />
          </Grid>
        </Grid>

      </Container>

      <Container style={{ marginTop: '80px' }}>
        <Grid item xs={12} md={6}>
              <ScanTron />
        </Grid>
      </Container>
      
    </div>
  )
}

export default TestPage 