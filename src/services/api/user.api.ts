import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

export const getUserData = createAsyncThunk(
  "user/data",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("accounts/me");

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);
