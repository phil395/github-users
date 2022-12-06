import type { IUser } from "./user";

export type IFollower = Pick<IUser, "id" | "login" | "avatar" | "url">;
