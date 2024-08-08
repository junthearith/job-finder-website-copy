import axios from "axios";
import { BASE_URL } from "./api";

export const register = (userData) => {
  return axios.post(`${BASE_URL}register/`, userData);
};

export const login = (userCredentials) => {
  return axios.post(`${BASE_URL}login/`, userCredentials);
};

export const verifyOtpCode = ({ email, otp_code }) => {
  return axios.post(`${BASE_URL}verify-otp/`, { email, otp_code });
};

export const getProfile = (token) => {
  return axios.get(`${BASE_URL}profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (token, profileData) => {
  console.log(profileData);
  
  return axios.put(`${BASE_URL}profile/`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resendOtp = (email) => {
  return axios.post(`${BASE_URL}resend-otp/`, { email });
};

// Add this to your userApi.js
export const requestPasswordReset = (email) => {
  return axios.post(`${BASE_URL}password-reset-request/`, { email });
};

export const confirmPasswordReset = (resetData) => {
  return axios.post(`${BASE_URL}password-reset/`, resetData);
};
