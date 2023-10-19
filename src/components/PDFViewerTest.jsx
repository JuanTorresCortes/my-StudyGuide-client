import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button, Grid } from '@mui/material';

function PDFViewerTest({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='dev-border'>
       <Grid item style={{ marginTop: '10px' }}>
        <Button 
          variant="contained" 
          disabled={pageNumber <= 1} 
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </Button>
        <Button 
          variant="contained" 
          disabled={pageNumber >= numPages} 
          onClick={() => setPageNumber(pageNumber + 1)}
          style={{ marginLeft: '10px' }}
        >
          Next
        </Button>
      </Grid>
        <Grid container direction="column" alignItems="center" style={{  maxWidth:'100%', maxHeight: '60vh', overflowY: 'auto' }}>
      <Grid item>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={400} />
        </Document>
      </Grid>
    </Grid>
    </div>
    
  );
}

export default PDFViewerTest;
