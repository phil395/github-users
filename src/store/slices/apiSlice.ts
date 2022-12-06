// external
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// other
import { githubApiRun } from "@services";
// types
import type { IExtendedUser } from "@models/user";
import { ILimit } from "@models/limit";
import { IApiData } from "@models/apiData";


export const API_DATA_KEY_IN_LS = "apiDataState";

export interface IApiSlice {
  status: "initial" | "idle" | "pending" | "error";
  data?: IExtendedUser;
  limit?: ILimit;
  errorMsg?: string;
}

export const getApiData = createAsyncThunk<IApiData, string>(
  "api/getDataStatus",
  async (login: string) => {
    const loginInLS = localStorage.getItem(login);
    if (loginInLS) {
      const apiData = JSON.parse(loginInLS).api;
      localStorage.setItem(API_DATA_KEY_IN_LS, JSON.stringify(apiData));
      return { user: apiData } as IApiData;
    }

    const apiData = await githubApiRun(login);
    localStorage.setItem(API_DATA_KEY_IN_LS, JSON.stringify(apiData.user));

    return apiData;
  }
);

export const initialState: IApiSlice = {
  status: "initial",
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    resetApiError: (state) => {
      state.status = "idle";
      state.errorMsg = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiData.pending, (state) => {
        state.status = "pending";
        state.errorMsg = undefined;
      })
      .addCase(getApiData.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = payload.user;
        if (payload.limit) state.limit = payload.limit;
      })
      .addCase(getApiData.rejected, (state, action) => {
        state.status = "error";
        state.errorMsg = action.error.message;
      });
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;

// selectors
// export const selectApiStatus = (state: RootState) => state.api.status;
