import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/userSlice";
import { authSlice } from "./slices/auth/authSlice"

export const store = configureStore({
    reducer: {
        users: userSlice.reducer, 
        auth: authSlice.reducer
    }
})