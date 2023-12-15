import { pdfjs } from "react-pdf";
// worker source CDN
// ensuring smooth performance with react-pdf components => import { Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";
import { validateUser } from "./Api/api";
import { CssBaseline, Container, Box } from "@mui/material";

function App() {
  const [userToken, setUserToken] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState("");
  const [userName, setUserName] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [test, setTest] = useState({});

  const navigate = useNavigate();

  // Effect hook to check and set the user token from local storage on component mount
  // When the component mounts, check for the user token in local storage and set it in state.
  // This ensures that the user stays authenticated on page reloads or revisits.
  // ⚠️ import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";⚠️
  useEffect(() => {
    const token = getUserToken();
    setUserToken(token);
  }, [shouldRefresh]);

  // Effect hook to verify the user's token and fetch the user's information
  // When the user token changes, verify the user's authenticity using the validateUser API call.
  // If the token is invalid or expired, the user is logged out by removing the token from local storage.
  useEffect(() => {
    const verifyUser = async () => {
      if (userToken) {
        const verifyResult = await validateUser(userToken);

        if (verifyResult.success) {
          const userFullName = `${verifyResult.name}`;
          setUserName(userFullName);

          // verifyResult from backend user controller caries userInfo success: res
          const info = verifyResult;
          setUserInfo(info);
          setIsVerified(true);
        } else {
          setShouldRefresh(false);

          const resultLogout = await removeUserToken();
          if (resultLogout) {
            setIsVerified(false);
            setShouldRefresh(false);
            navigate("/");
          }
        }
      }
    };
    verifyUser();
  }, [userToken]);

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <CssBaseline />

      <Box flexGrow={1}>
        <NavBar
          userName={userName}
          isVerified={isVerified}
          setShouldRefresh={setShouldRefresh}
          setUserName={setUserName}
          setIsVerified={setIsVerified}
        />
        <Outlet
          context={{
            userToken,
            setUserToken,
            setShouldRefresh,
            userInfo,
            test,
            setTest,
          }}
        />
      </Box>
    </Box>
  );
}

export default App;
