import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/apiConfig";

const initialState = {
  user: null, // User information (if applicable)
  list: [], // List of all CVs
  token: "",
  currentCV: null, // Current CV being viewed/edited
  loading: false,
  error: null,
  isEditing: false, // Indicates if a CV is currently being edited
  validationErrors: {}, // Validation errors for CV data
};

export const getMyCVs = createAsyncThunk("cv/getMyCVs", async ({ token }) => {
  try {
    console.log({ "Token from slice": token });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.get(`/cv/getmany`, config);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyCVs.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.loading = false;
      })
      .addCase(getMyCVs.pending, (state, action) => {
        state.loading = true;
        state.isEditing = false;
      })
      .addCase(getMyCVs.rejected, (state, action) => {
        state.error = "Error occured while getting the CVs";
      });
  },
});

export const {} = cvSlice.actions;

export default cvSlice.reducer;
