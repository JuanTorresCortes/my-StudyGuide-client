import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

// // Function to register a new user by making a POST request to the server
const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/users/register-user`,
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Function to log in a user by making a POST request to the server
const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login-user`, userData);
    return response.data;
  } catch (error) {
    //return { success: false, error: error.response.data }; // Return an object with a success field set to false and the error data
    return error.response.data;
  }
};

// Function to validate a user's token by making a GET request to the server
const validateUser = async (userToken) => {
  try {
    const response = await axios.get(`${baseUrl}/users/validate`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = response.data;
    // console.log("from validateUser", data);
    return data;
    // return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const uploadTest = async (testData) => {
  try {
    const response = await axios.post(`${baseUrl}/tests/upload-test`, testData);
    return response.data; // Return the data directly if successful
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code outside of the range of 2xx
      throw new Error(error.response.data.message || "Error uploading file.");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server. Please try again.");
    } else {
      // Some other error occurred during setup
      throw error; // Re-throw the error to be caught by the calling function
    }
  }
};

const getTestBySub = async (sub) => {
  try {
    const response = await axios.get(`${baseUrl}/tests/get-test-topic/${sub}`);
    return response.data;
  } catch (error) {
    //console.log(error);
    return error.response.data;
  }
};

const getTestKey = async (keyID) => {
  try {
    const response = await axios.get(`${baseUrl}/testKey/get-key-id/${keyID}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const addCompletedTest = async (userID, testScoreData) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/test-complete/add-completed-test/${userID}`,
      testScoreData
    );
    return response.data;
    console.log("Test successfully added:", response.data);
  } catch (error) {
    console.error("Error adding test:", error);
  }
};

const getCompletedTest = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl}/test-complete/get-completed-test/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error getting test:", error);
  }
};

const loginAdmin = async () => {
  try {
    const response = await axios.post(`${baseUrl}/users/login-user`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  registerUser,
  loginUser,
  validateUser,
  uploadTest,
  getTestBySub,
  getTestKey,
  addCompletedTest,
  getCompletedTest,
  loginAdmin,
};
