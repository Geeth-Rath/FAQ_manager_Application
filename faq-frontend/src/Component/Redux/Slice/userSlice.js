import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/create",
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to register user");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/all");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch all users");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
