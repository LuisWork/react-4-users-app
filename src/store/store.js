import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/userSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer, 
        auth: authSlice.reducer
    }
})