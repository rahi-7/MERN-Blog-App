import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; //Manages the state related to authentication (e.g., login, logout)
import profileReducer from '../features/profile/profileSlice'; // Manages the state related to user profiles.
import blogReducer from '../features/blog/blogSlice';//  Manages the state related to blogs (e.g., creating, updating, deleting posts).
import categoryReducer from '../features/category/categorySlice';// : Manages the state related to blog categories.
import adminReducer from '../features/admin/adminSlice';// Manages the state related to admin-specific actions.

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    blog: blogReducer,
    category: categoryReducer,
    admin: adminReducer                    //The store is then exported so it can be used throughout the React application, typically by passing 
                                          //it to the Provider component at the root of the app.

  },
});
//configureStore: Simplifies the process of creating a Redux store with good defaults.
//Reducers: The individual pieces of logic that manage specific slices of the application's state.
//Store: The central place where the entire state of your application is managed.