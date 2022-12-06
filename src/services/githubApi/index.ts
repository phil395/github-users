import { multiFetch } from "./fetch";
import { formatData } from "./format";
// types
import { IApiData } from "@models/apiData";

export const githubApiRun = async (login: string): Promise<IApiData> => {
  const result = await multiFetch(login);
  return formatData(result);
};
