// external
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// other
import { parserRun } from "@services";
// types
import { IParsedData } from "@models/parsedData";


export const PARSED_DATA_KEY_IN_LS = "parsedDataState";

export interface IParserSlice {
  status: "initial" | "idle" | "pending" | "error";
  data?: IParsedData;
  errorMsg?: string;
}

export const parseData = createAsyncThunk<IParsedData, string>(
  "parser/parseDataStatus",
  async (login: string) => {
    const loginInLS = localStorage.getItem(login);
    if (loginInLS) {
      const parsedData = JSON.parse(loginInLS).parser;
      localStorage.setItem(PARSED_DATA_KEY_IN_LS, JSON.stringify(parsedData));
      return parsedData as IParsedData;
    }

    const parsedData = await parserRun(login);
    localStorage.setItem(PARSED_DATA_KEY_IN_LS, JSON.stringify(parsedData));

    return parsedData;
  }
);

export const initialState: IParserSlice = {
  status: "initial",
};

export const parserSlice = createSlice({
  name: "parser",
  initialState,
  reducers: {
    resetParserError: (state) => {
      state.status = "idle";
      state.errorMsg = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(parseData.pending, (state) => {
        state.status = "pending";
        state.data = undefined;
        state.errorMsg = undefined;
      })
      .addCase(parseData.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = payload;
      })
      .addCase(parseData.rejected, (state, action) => {
        state.status = "error";
        state.errorMsg = action.error.message;
      });
  },
});

export const parserActions = parserSlice.actions;
export default parserSlice.reducer;

// selectors
// export const selectParserStatus = (state: RootState) => state.parser.status;
