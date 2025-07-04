import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // adjust if your path differs

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
