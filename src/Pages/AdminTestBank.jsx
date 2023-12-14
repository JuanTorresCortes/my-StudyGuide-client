import React from "react";
import { CssBaseline, Box } from "@mui/material";
import AdminNav from "../components/AdminNav";
import { getAllTests } from "../Api/api";

const AdminTestBank = () => {
  return (
    <Box>
      <CssBaseline />
      <AdminNav />
    </Box>
  );
};

export default AdminTestBank;
