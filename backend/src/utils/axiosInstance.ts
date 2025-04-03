// Creating an Axios instance with a base URL
import axios from 'axios';

// You can set this base URL based on your environment
const axiosInstance = axios.create({
  baseURL:  'http://localhost:5000',  // Use environment variable for flexibility
  timeout: 5000,  // Set a timeout for requests (optional)
});

export default axiosInstance;
