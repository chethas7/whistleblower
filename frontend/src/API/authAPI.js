import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginUser = async (emailOrUsername, password, rememberMe) => {
  return await axios
    .post(
      `${API_URL}/login`,
      { emailOrUsername, password, rememberMe },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};
