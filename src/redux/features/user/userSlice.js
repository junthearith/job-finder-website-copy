import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  confirmPasswordReset,
  getProfile,
  login,
  register,
  requestPasswordReset,
  resendOtp,
  updateProfile,
  verifyOtpCode,
} from "../../api/userApi";

// Helper function to extract error message
const getErrorMessage = (error) => {
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : null;
};

// Asynchronous thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      console.log("email", userData.email);
      localStorage.setItem("email", userData.email);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Asynchronous thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await login(userCredentials);
      const { access, refresh } = response.data;
      console.log("User Slice : ", response);
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Asynchronous thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp_code }, { rejectWithValue }) => {
    try {
      const response = await verifyOtpCode({ email, otp_code });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Asynchronous thunk for getting profile
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getProfile(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Asynchronous thunk for updating profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ token, profileData }, { rejectWithValue }) => {
    try {
      const response = await updateProfile(token, profileData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Asynchronous thunk for resending OTP
export const resendOtpCode = createAsyncThunk(
  "user/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendOtp(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const requestPasswordResetThunk = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await requestPasswordReset(email);
      localStorage.setItem("email", email);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const confirmPasswordResetThunk = createAsyncThunk(
  "user/confirmPasswordReset",
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await confirmPasswordReset(resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// User slice definition
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    accessToken: localStorage.getItem("access" || null),
    refreshToken: localStorage.getItem("refresh" || null),
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isPasswordResetRequested: false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    // Add logout reducer to clear state and localStorage
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    // Load tokens from localStorage on initialization
    loadTokens: (state) => {
      state.accessToken = localStorage.getItem("access");
      state.refreshToken = localStorage.getItem("refresh");
      state.isAuthenticated = !!localStorage.getItem("access");
    },
    setIsAuthenticatedFalse(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resendOtpCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOtpCode.fulfilled, (state, action) => {
        state.isLoading = false;
        // You can choose to update the state in some way here if needed
        // For example, show a message that OTP has been resent
        console.log("OTP resent successfully");
      })
      .addCase(resendOtpCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle requestPasswordResetThunk states
      .addCase(requestPasswordResetThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordResetThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isPasswordResetRequested = true;
      })
      .addCase(requestPasswordResetThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(confirmPasswordResetThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmPasswordResetThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isPasswordResetRequested = false;
        state.error = null;
      })
      .addCase(confirmPasswordResetThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { logout, loadTokens, loginSuccess, setIsAuthenticatedFalse } =
  userSlice.actions;
export default userSlice.reducer;
