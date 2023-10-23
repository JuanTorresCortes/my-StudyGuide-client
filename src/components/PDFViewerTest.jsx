import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button, Grid } from '@mui/material';

// Utility function to convert buffer to a data URL
const bufferToDataURL = (bufferData) => {
  const arrayBuffer = new Uint8Array(bufferData).buffer;
  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
};

function PDFViewerTest({ pdfData }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const pdfSource = bufferToDataURL(pdfData);

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
      <Grid container direction="column" alignItems="center" style={{ maxWidth:'100%', maxHeight: '60vh', overflowY: 'auto' }}>
        <Grid item>
          <Document 
            file={pdfSource} 
            onLoadSuccess={onDocumentLoadSuccess}
            onError={(error) => console.error("PDF error:", error)}
          >
            <Page pageNumber={pageNumber} width={400} />
          </Document>
        </Grid>
      </Grid>
    </div>
  );
}

export default PDFViewerTest;
