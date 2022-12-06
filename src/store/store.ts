// external
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// other
import { preloadedStateBuilder } from "./preloadedState";
import api from "./slices/apiSlice";
import parser from "./slices/parserSlice";
import saving from "./slices/savingSlice";
import toasts from "./slices/toastifySlice";


const reducer = {
  api,
  parser,
  saving,
  toasts,
};

export const preloadedState = preloadedStateBuilder();

export const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type Reducer = keyof typeof reducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
