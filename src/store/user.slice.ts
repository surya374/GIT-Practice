import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getUserData } from "@/services/api/user.api";

export interface UserState {
  inlineLoading?: boolean;
  loading?: boolean;
  token?: string;
  data?: User;
}

const initialState: UserState = {
  data: undefined,
  token: "",
  inlineLoading: false,
  loading: false,
};

const dontShowError = [].map((i) => (i as any)?.typePrefix?.split?.("/")?.[1]);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.data = { ...action?.payload?.data };
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        if (action.type.includes("loading")) {
          state.loading = true;
        } else if (!action.type.includes("silent")) {
          state.inlineLoading = true;
        }
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state, action) => {
        if (action.type.includes("loading")) {
          state.loading = false;
        } else if (!action.type.includes("silent")) {
          state.inlineLoading = false;
        }
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        // if (action.payload.status === 401) {
        //   // TODO: LOGOUT USER
        // }

        if (action.type.includes("loading")) {
          state.loading = false;
        } else if (!action.type.includes("silent")) {
          state.inlineLoading = false;
        }

        if (
          (action as any).payload?.message &&
          !dontShowError.includes(action.type?.split("/")[1])
        ) {
          // TODO: Handle errors
        }
      }
    );
  },
});

export const { setToken } = userSlice.actions;

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;
