import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

export const loginUser = async (emailOrUsername, password, rememberMe) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    emailOrUsername,
    password,
    rememberMe,
  });

  if (rememberMe) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};
export const verifyOtp = async ({ email, otp }) => {
  const res = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
  return res.data;
};
