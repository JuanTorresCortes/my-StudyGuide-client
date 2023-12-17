import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Button,
} from "@mui/material";

function UserCard({ name, email, onTestView, imageUrl, onDelete }) {
  return (
    <Card
      sx={
        {
          // width: 300,
          // height: 300,
          // boxShadow: 3,
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "space-between",
        }
      }
    >
      <CardMedia
        component="img"
        sx={{ maxHeight: 200, objectFit: "cover" }}
        image={imageUrl || "/profile.png"}
        alt="User Image"
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {name || "Name Not Provided"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Email: {email || "Email Not Available"}
        </Typography>
      </CardContent>

      <Button
        variant="contained"
        color="info"
        onClick={() => onTestView()}
        sx={{ marginBottom: 2 }}
      >
        Test Record
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => onDelete()}
        sx={{ marginBottom: 2 }}
      >
        Delete User
      </Button>
    </Card>
  );
}

export default UserCard;
// width: "100%", height: "40%",
