import {
  API_DATA_KEY_IN_LS,
  initialState as apiSliceInitialState,
} from "./slices/apiSlice";
import {
  PARSED_DATA_KEY_IN_LS,
  initialState as parserSliceInitialState,
} from "./slices/parserSlice";
import {
  TABLE_KEY_IN_LS,
  initialState as savingSliceInitialState,
} from "./slices/savingSlice";
import { initialState as toastifySliceInitialState } from "./slices/toastifySlice";
// types
import { IParsedData } from "@models/parsedData";
import { ITableData } from "@models/table";
import { IExtendedUser } from "@models/user";

export const preloadedStateBuilder = () => {
  if (typeof window === "undefined") return undefined;

  const api = localStorage.getItem(API_DATA_KEY_IN_LS);
  const parser = localStorage.getItem(PARSED_DATA_KEY_IN_LS);
  const table = localStorage.getItem(TABLE_KEY_IN_LS);

  const savingState: typeof savingSliceInitialState = table
    ? { ...savingSliceInitialState, data: JSON.parse(table) as ITableData[] }
    : savingSliceInitialState;

  if (!api || !parser) {
    if (table) return { saving: savingState };
    return undefined;
  }

  const apiData = JSON.parse(api) as IExtendedUser;
  const parserData = JSON.parse(parser) as IParsedData;

  if (apiData.login !== parserData.login) {
    if (table) return { saving: savingState };
    return undefined;
  }

  // const apiState: typeof apiSliceInitialState = api
  // 	? { ...apiSliceInitialState, data: JSON.parse(api) as IExtendedUser, status: 'idle' }
  // 	: apiSliceInitialState;

  // const parseState: typeof parserSliceInitialState = parser
  // 	? { ...parserSliceInitialState, data: JSON.parse(parser) as IParsedData, status: 'idle' }
  // 	: parserSliceInitialState;

  const apiState: typeof apiSliceInitialState = {
    ...apiSliceInitialState,
    data: apiData,
    status: "idle",
  };

  const parseState: typeof parserSliceInitialState = {
    ...parserSliceInitialState,
    data: parserData,
    status: "idle",
  };

  return {
    api: apiState,
    parser: parseState,
    saving: savingState,
    toasts: toastifySliceInitialState,
  };
};
