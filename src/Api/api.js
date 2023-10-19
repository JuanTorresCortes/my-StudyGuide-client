import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

// // Function to register a new user by making a POST request to the server
exports.registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/register`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Function to log in a user by making a POST request to the server
exports.loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, userData);
    return response.data;
  } catch (error) {
    //return { success: false, error: error.response.data }; // Return an object with a success field set to false and the error data
    return error.response.data;
  }
};

// Function to validate a user's token by making a GET request to the server
exports.validateUser = async (userToken) => {
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

exports.uploadTest = async (testData) => {
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
