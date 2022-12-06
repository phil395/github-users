// external
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface IToast {
  id: string;
  text: string;
  type: ToastType;
  timer: number;
}

export const enum ToastType {
  Error,
  Success,
  Info,
}

export interface NewToast {
  text: string;
  type?: ToastType;
  timer?: number;
}

export interface IToastifySlice {
  messages: IToast[];
}

export const initialState: IToastifySlice = {
  messages: [],
};

export const toastifySlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: {
      reducer: (state, action: PayloadAction<IToast>) => {
        state.messages.push(action.payload);
      },
      prepare: ({ text, type, timer }: NewToast) => ({
        payload: {
          id: nanoid(),
          text,
          type: type ?? ToastType.Info,
          timer: timer ?? 7,
        },
      }),
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const toastifyActions = toastifySlice.actions;
export default toastifySlice.reducer;
