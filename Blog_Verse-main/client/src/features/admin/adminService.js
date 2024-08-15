import axios from "axios"; // This code defines a set of functions for interacting with an admin-related backend API using Axios. 
import { BACKEND_HOST_URL } from "../../config/defaults";

// Get All Users List 
const getAllUsers = async (authToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }
    const res = await axios.get(`${BACKEND_HOST_URL}/admin/getAllUsers`, config);
    return res.data;
}

// Toggle User Role
const toggleRole = async (authToken, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }
    const res = await axios.post(`${BACKEND_HOST_URL}/admin/toggleRole`, data, config);
    return res.data;
}

// Toggle User Block
const toggleBlock = async (authToken, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }
    const res = await axios.post(`${BACKEND_HOST_URL}/admin/toggleBlock`, data, config);
    return res.data;
}

// Get user complete  details by user id 
const getUserDetails = async (authToken, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }
    const res = await axios.post(`${BACKEND_HOST_URL}/admin/getUserDetailsByUserId`, data, config);
    return res.data;
}

export default {
    getAllUsers,
    toggleRole,
    toggleBlock,
    getUserDetails
}
// Each function is designed to perform a specific action, such as fetching user data or updating user roles
// The authToken is crucial for authorizing these requests, and each function returns the response data from the backend API.