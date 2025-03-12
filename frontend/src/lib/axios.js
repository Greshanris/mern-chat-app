// creating instance of axios
import axios from 'axios';

// creating instance of axios using create method that takes an object with baseURL property
// baseURL is the base URL for all requests
// this is the base URL for the backend API which is for us the http://localhost:5001/api/
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api/",
    // but we would like to send cookies with every single request
    // so we set withCredentials to true
    withCredentials: true,
    
})