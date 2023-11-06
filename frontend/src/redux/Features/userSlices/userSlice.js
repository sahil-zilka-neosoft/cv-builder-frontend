import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/apiConfig";

// use constants from ENV files for good and security

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await api.post(
        "/user/login",
        { email, password },
        config
      );
      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem("token", JSON.stringify(token));
      }

      return response.data;
    } catch (error) {
      return { error: "An error occurred while processing your request" };
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await api.post(
        "/user/register",
        { name, email, password },
        config
      );
      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem("token", JSON.stringify(token));
      }
      return response.data;
    } catch (error) {
      return { error: "An error occurred while processing your request" };
    }
  }
);

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = {};
      state.loading = false;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        } else {
          state.error =
            action.payload.error || "Unexpected response from server";
        }
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred while processing your request";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        } else {
          state.error =
            action.payload.error || "Unexpected response from server";
        }
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred while processing your request";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
