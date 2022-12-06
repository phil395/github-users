// external
import { createSlice } from "@reduxjs/toolkit";
// other
import { formatDataForTable } from "./helpers";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "../store";
import { ITableData } from "@models/table";


export const TABLE_KEY_IN_LS = "tableState";

export interface ISavingSlice {
  data: ITableData[];
  errorMsg?: string;
}

export const initialState: ISavingSlice = {
  data: [],
};

export const savingSlice = createSlice({
  name: "saving",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ITableData>) => {
      state.data.push(action.payload);
    },
    updateItems: (state, action: PayloadAction<ITableData[]>) => {
      state.data = action.payload;
    },
    setErrMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
    resetSavingError: (state) => {
      state.errorMsg = undefined;
    },
  },
});

const { addItem, updateItems, resetSavingError, setErrMsg } =
  savingSlice.actions;

export const savingActions = {
  saveUser: (): AppThunk => (dispatch, getState) => {
    const { api, parser, saving } = getState();

    if (!api.data || !parser.data) {
      dispatch(setErrMsg("Empty data present saving not possible"));
      return;
    }

    const formattedUserData = formatDataForTable(api.data, parser.data);
    // Save in LS
    localStorage.setItem(
      api.data.login,
      JSON.stringify({
        api: api.data,
        parser: parser.data,
      })
    );
    localStorage.setItem(
      TABLE_KEY_IN_LS,
      JSON.stringify([...saving.data, formattedUserData])
    );
    // Add in Table
    dispatch(addItem(formattedUserData));
  },

  removeUser:
    (login: string): AppThunk =>
      (dispatch, getState) => {
        const savedUsers = getState().saving.data;
        const filteredUsers = [...savedUsers].filter(
          (user) => user.login !== login
        );

        localStorage.removeItem(login);
        localStorage.setItem(TABLE_KEY_IN_LS, JSON.stringify(filteredUsers));

        dispatch(updateItems(filteredUsers));
      },

  resetSavingError,
};

export default savingSlice.reducer;
