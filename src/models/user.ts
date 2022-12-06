import type { ILanguageCounters } from "./charts";
import type { IFollower } from "./follower";
import type { ISortedRepos } from "./repos";

export interface IUser {
  id: number;
  login: string;
  name: string;
  avatar: string;

  bio: string;
  company: string;
  location: string;
  blog: string;
  twitter?: string;
  url: string;

  repos: number;
  gists: number;
  followers: number;
  following: number;
}

export interface IExtendedUser extends IUser {
  followersList: IFollower[];
  sortedRepos: ISortedRepos;
  languagesData: [string, ILanguageCounters][];
}
