import { createSlice } from "@reduxjs/toolkit";

const storedAuth = JSON.parse(localStorage.getItem("auth"));

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: storedAuth?.user || null,
        isAuthenticated: !!storedAuth,
    },

    reducers: {

        login: (state, action) => {

            state.user = action.payload.user;
            state.isAuthenticated = true;
        },

        logout: (state) => {

            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("auth");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;