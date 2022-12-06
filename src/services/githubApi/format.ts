import {
  calculationLanguagesCharts,
  calculationReposChart,
} from "./calculation";
// types
import type { IFollower } from "@models/follower";
import type { IRepo } from "@models/repos";
import type {
  ICommonGitHubResponse,
  IFollowerResponse,
  ILimitResponse,
  IRepoResponse,
  IUserResponse,
} from "./responses.types";
import type { IExtendedUser, IUser } from "@models/user";
import type { ILimit } from "@models/limit";
import type { IApiData } from "@models/apiData";
//

export const formatData = (data: ICommonGitHubResponse): IApiData => {
  try {
    const repos = formatRepos(data.repos);

    const user: IExtendedUser = {
      ...formatUser(data.user),
      sortedRepos: calculationReposChart(repos),
      followersList: formatFollowers(data.followers),
      languagesData: calculationLanguagesCharts(repos),
    };

    const limit = formatLimit(data.limit);

    return {
      user,
      limit,
    };
  } catch (e) {
    console.error(e);
    throw "Data formatting error. Check console";
  }
};

const formatUser = (user: IUserResponse): IUser => {
  return {
    id: user.id,
    login: user.login,
    name: user.name,
    avatar: user.avatar_url,

    bio: user.bio,
    company: user.company,
    location: user.location,
    blog: user.blog,
    twitter: user.twitter_username,
    url: user.html_url,

    repos: user.public_repos,
    gists: user.public_gists,
    followers: user.followers,
    following: user.following,
  };
};

const formatFollowers = (followers: IFollowerResponse[]): IFollower[] => {
  return followers.map((follower) => ({
    id: follower.id,
    login: follower.login,
    avatar: follower.avatar_url,
    url: follower.html_url,
  }));
};

const formatRepos = (repos: IRepoResponse[]): IRepo[] => {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    language: repo.language ?? "Unknown",
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    stars: repo.stargazers_count,
  }));
};

const formatLimit = (limit: ILimitResponse): ILimit => {
  return {
    limit: limit.rate.limit,
    used: limit.rate.used,
  };
};
