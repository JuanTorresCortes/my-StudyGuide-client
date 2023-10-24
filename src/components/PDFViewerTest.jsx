import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button, Grid } from "@mui/material";

// This utility function takes binary buffer data for a PDF and converts it into a data URL.
// This conversion is needed because the 'react-pdf' library requires a URL or file path to load a PDF.
// EX => data:application/pdf;base64,JVBERi0xLjMKJcfs...

const bufferToDataURL = (bufferData) => {
  // Convert the buffer data to an array buffer.
  const arrayBuffer = new Uint8Array(bufferData).buffer; //wrap the buffer data in a array/form that can be used to create a Blob.

  // Create a new blob object from the array buffer with a type of 'application/pdf'.
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  // Convert the blob to a data URL and return it.
  return URL.createObjectURL(blob);
};

function PDFViewerTest({ pdfData }) {
  // number of pages in the PDF.
  const [numPages, setNumPages] = useState(null);

  // track of the current page being viewed.
  const [pageNumber, setPageNumber] = useState(1);

  //⭐️ Convert the PDF buffer data into a data URL source for 'react-pdf' to use.
  const pdfSource = bufferToDataURL(pdfData);

  // This function is called once the PDF is successfully loaded.
  function onDocumentLoadSuccess({ numPages }) {
    // Update the total number of pages
    setNumPages(numPages);
  }

  return (
    <div className="dev-border">
      {/* Grid item for navigation buttons */}
      <Grid item style={{ marginTop: "10px" }}>
        {/* "Previous" button to navigate to the previous page */}
        <Button
          variant="contained"
          // Disable the button if we're on the first page
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </Button>

        {/* "Next" button to navigate to the next page */}
        <Button
          variant="contained"
          // Disable the button if we're on the last page
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </Button>
      </Grid>

      {/* Grid container displaying the PDF */}
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ maxWidth: "100%", maxHeight: "60vh", overflowY: "auto" }}
      >
        <Grid item>
          {/* 'Document' component from 'react-pdf' to load and display the PDF */}
          <Document
            // Provide the data URL of the PDF as the file source
            file={pdfSource}
            // Callback function when the PDF loads successfully update number of pages
            onLoadSuccess={onDocumentLoadSuccess}
            // Callback function for error handling
            onError={(error) => console.error("PDF error:", error)}
          >
            {/* 'Page' component from 'react-pdf' to display a specific page of the PDF */}
            <Page pageNumber={pageNumber} width={400} />
          </Document>
        </Grid>
      </Grid>
    </div>
  );
}

export default PDFViewerTest;
