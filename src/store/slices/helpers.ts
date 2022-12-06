import { IParsedData } from "@models/parsedData";
import { ITableData } from "@models/table";
import { IExtendedUser } from "@models/user";

/* export const initialStateBuilde = {
  api: (initialState: IApiSlice) => {
    const api = localStorage.getItem(API_DATA_KEY_IN_LS);
    return api
      ? { ...initialState, data: JSON.parse(api) as IExtendedUser, status: 'idle' }
      : initialState;
  },
  parser: (initialState: IParserSlice) => {
    const parser = localStorage.getItem(PARSED_DATA_KEY_IN_LS);
    return parser
      ? { ...initialState, data: JSON.parse(parser) as IParsedData, status: 'idle' }
      : initialState;
  },
  saving: (initialState: ISavingSlice) => {
    const table = localStorage.getItem(TABLE_KEY_IN_LS);
    return table
      ? { ...initialState, data: JSON.parse(table) as ITableData[] }
      : initialState;
  }
}; */

// export const getInitialState = (): ISavingSlice => {
// 	if (typeof window === 'undefined') return { data: [] };		// for server rendering

// 	const serializedTableState = localStorage.getItem(TABLE_KEY_IN_LS);
// 	return serializedTableState
// 		? { data: JSON.parse(serializedTableState) }
// 		: { data: [] };
// };

export const formatDataForTable = (
  user: IExtendedUser,
  parsedData: IParsedData
): ITableData => {
  return {
    avatar: user.avatar,
    login: user.login,
    starsQty: user.languagesData.reduce(
      // eslint-disable-next-line
      (acc, [_, { stars }]) => acc + stars,
      0
    ),
    achievementsQty: parsedData.achievements.reduce(
      (acc, { count }) => acc + count,
      0
    ),
    languagesQty: user.languagesData.length,
    reposQty: user.repos,
    followers: user.followers,
    following: user.following,
    contributionsQty: {
      total: parsedData.contributions.counters.total,
      lastYear: parsedData.contributions.counters.lastYear,
    },
    createdAt: parsedData.createdAt,
  };
};
