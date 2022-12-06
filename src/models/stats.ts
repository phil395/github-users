import type { IUser } from "./user";

export type StatNames = "repos" | "gists" | "followers" | "following";

export type IStats = Pick<IUser, StatNames>;
