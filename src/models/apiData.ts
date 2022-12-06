import type { ILimit } from "./limit";
import type { IExtendedUser } from "./user";

export interface IApiData {
  user: IExtendedUser;
  limit?: ILimit;
}
