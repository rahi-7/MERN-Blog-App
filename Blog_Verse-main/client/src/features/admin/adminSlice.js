import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; //manages the state related to admin actions
import adminService from './adminService';
import { isValidJSON } from '../../app/helpers';

const initialState = {
    usersList: null, //  Holds the list of users, initially
    isLoading: false,// Indicates if an operation is in progress
    isSuccess: false,// operation was successfu
    isError: false, //  an error occurred
    successMessage: [], //  Stores success message
    errorMessage: [] // Stores error messages, initially an empty array
}

// Get All Users list 
export const getAllUsers = createAsyncThunk('/admin/getAllUsers', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token;
        return await adminService.getAllUsers(token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Toggle User Role
export const toggleUserRole = createAsyncThunk('/admin/toggleRole', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token;  //Sends the user data and token.
        return await adminService.toggleRole(token, data);   //On success, it returns the updated data.

    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Toggle User Block
export const toggleUserBlock = createAsyncThunk('/admin/toggleBlock', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token;
        return await adminService.toggleBlock(token, data);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get user all details by userid 
export const getUserDetails = createAsyncThunk('/admin/getUserDetails', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token; //Sends the user ID and token.
        return await adminService.getUserDetails(token, data); // On success, it returns the user details.
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // // Resets the state to its initial values.
        adminLogout: (state, action) => { 
            state.usersList = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.successMessage = [];
            state.errorMessage = [];
        }
    },
    extraReducers: (builder) => {
        builder
        //Resets the state, indicates loading.
            .addCase(getAllUsers.pending, (state, action) => {
                state.usersList = [];
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.successMessage = [];
                state.errorMessage = [];
            })
            //Updates usersList with the data, sets isLoading to false and isSuccess to true
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.usersList = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = [];
                state.errorMessage = [];
            })
            //Rejected: Resets usersList, sets isLoading to false, isError to true, and parses error messages.
            .addCase(getAllUsers.rejected, (state, action) => {
                state.usersList = [];
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.successMessage = [];
                state.errorMessage = isValidJSON(action.payload) ? Object.values(JSON.parse(action.payload)) : [action.payload];
            })
    }
})


export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

//Dispatch Actions: The async thunks (getAllUsers, toggleUserRole, etc.) can be dispatched from components to trigger these operations.
//State Management: The state managed by this slice can be accessed in components via useSelector to show loading indicators, error messages, etc.