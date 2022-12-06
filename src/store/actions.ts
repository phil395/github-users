import { apiActions, getApiData } from "./slices/apiSlice";
import { parseData, parserActions } from "./slices/parserSlice";
import { savingActions } from "./slices/savingSlice";
import { toastifyActions } from "./slices/toastifySlice";
// types
import type { AppThunk } from "./store";

export const actions = {
  getUserData:
    (login: string): AppThunk =>
      (dispatch, getState) => {

        const currentLogin = getState().api.data?.login;
        if (currentLogin === login) return;

        dispatch(getApiData(login))
          .unwrap()
          .then(() => dispatch(parseData(login)))
          .catch(() => null); // error handled in apiSlice
      },
  ...apiActions,
  ...parserActions,
  ...toastifyActions,
  ...savingActions,
};
