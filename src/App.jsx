import React, { useState, useEffect, } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import {getUserToken,removeUserToken} from './Auth/authLocalStorage'
import {validateUser} from './Api/api'

function App() {
  const [userToken, setUserToken] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState("")
  const [userName, setUserName] = useState(null)
  const [userInfo, setUserInfo] = useState({})
  const [isVerified, setIsVerified] = useState(false)


// Effect hook to check and set the user token from local storage on component mount
  // When the component mounts, check for the user token in local storage and set it in state.
  // This ensures that the user stays authenticated on page reloads or revisits.
  // ⚠️ import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";⚠️
useEffect(() => {
  const token = getUserToken();
  setUserToken(token)
}, [shouldRefresh])

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
            setUser(null);
            setShouldRefresh(false);
          }
        }
      }
    };
    verifyUser();
  }, [userToken]);

  return (
    <> 
    <NavBar userName={userName} isVerified={isVerified} setShouldRefresh={setShouldRefresh} setUserName={setUserName} setIsVerified={setIsVerified}/>
    <Outlet context={{userToken, setUserToken, setShouldRefresh ,userInfo}}/>
    </>
  );
}

export default App;
