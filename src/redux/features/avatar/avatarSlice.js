import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import axios from "axios";

const token = localStorage.getItem("access");

const initialState = {
  user: {},
  user_profile: {},
  status: "idle",
  error: null,
};

// create fetch user
export const fetchUploadUserAvatar = createAsyncThunk(
  "user/fetchUploadUserAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user_profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadUserAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUploadUserAvatar.fulfilled, (state, action) => {
        state.status = "success";
        state.user_profile = action.payload;
      })
      .addCase(fetchUploadUserAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export reducer
export default userSlice.reducer;
export const selectUserProfile = (state) => state.user_profile.user_profile;
