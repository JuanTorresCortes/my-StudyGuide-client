import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserToken } from "../Auth/authLocalStorage";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Modal,
  Fade,
  Box,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // For the logout icon
import UserUpdateForm from "./UserUpdateForm";

const NavBar = ({
  isVerified,
  setIsVerified,
  userName,
  setUserName,
  setShouldRefresh,
  userInfo,
  setUserGrade,
  userGrade,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setShouldRefresh(true);

    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      setShouldRefresh(false);
      setUserName(null);
      setIsVerified(false);
      navigate("/");
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#151ad5" }}>
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
          sx={{ fontWeight: 700 }}
        >
          StudyLab
        </Typography>
        {isVerified ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              <Avatar>{userName.charAt(0)}</Avatar>{" "}
              {/* Displaying the first letter of userName */}
            </IconButton>

            <Typography variant="body1" style={{ marginRight: "1rem" }}>
              {userName}:Grade {userInfo.gradeLevel}
            </Typography>
            <Button
              onClick={() => navigate("/archive")}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              Test Archive
            </Button>
            <Button
              onClick={() => navigate("/Dashboard")}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              TEST SELECTION
            </Button>
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
              sx={{
                backgroundColor: "#151ad5", // Dark blue background
                color: "white", // White text
                borderRadius: 0, // Square edges
                "&:hover": {
                  backgroundColor: "#c00000", // Slightly darker blue on hover
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </>
        )}
      </Toolbar>

      {/* Register Form Modal */}
      <Modal
        aria-labelledby="registration-form-modal"
        aria-describedby="modal-to-register-new-users"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 14,
              outline: "none", // Removes the default focus outline
            }}
          >
            <UserUpdateForm
              handleClose={handleClose}
              userInfo={userInfo}
              setShouldRefresh={setShouldRefresh}
              setUserGrade={setUserGrade}
            />
          </Box>
        </Fade>
      </Modal>
    </AppBar>
  );
};

export default NavBar;
