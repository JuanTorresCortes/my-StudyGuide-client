import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Link, Button } from "@mui/material";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#151ad5",
        color: "white",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        py: 2, // This adds padding on the top and bottom of the Box
      }}
    >
      {/* Set the Container to have a maxWidth of "lg" and width of 100% */}
      <Container maxWidth="lg" sx={{ width: "100%", padding: 0 }}>
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://StudyLab.juan-codes.com/">
            StudyLab
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
          <br />
          <Button color="inherit" onClick={() => navigate("/admin")}>
            Admin
          </Button>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
