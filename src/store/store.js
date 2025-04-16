import { configureStore } from "@reduxjs/toolkit";
import { useUsers } from "../hooks/useUsers";
import { usersSlice } from "./slices/users/userSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer, 
    }
})