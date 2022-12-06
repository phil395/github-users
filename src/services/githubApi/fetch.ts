import {
  ICommonGitHubResponse,
  IFollowerResponse,
  IRepoResponse,
  IUserResponse,
  SuccessfulGitHubResponse,
  ILimitResponse,
} from "./responses.types";

export interface IGitHubApiEndpoints {
  user: string;
  followers: string;
  repos: string;
  limit: string;
}

const buildUrls = (login: string): IGitHubApiEndpoints => {
  const ORIGIN = "https://api.github.com";

  return {
    user: `${ORIGIN}/users/${login}`,
    followers: `${ORIGIN}/users/${login}/followers`,
    repos: `${ORIGIN}/users/${login}/repos?per_page=100`,
    limit: `${ORIGIN}/rate_limit`,
  };
};

const fetchBase = async <T extends SuccessfulGitHubResponse>(
  url: string
): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const { status, statusText } = res;
    const msg =
      status === 403
        ? "Limit reached. Wait next hour"
        : status === 404
        ? "Data not found"
        : `Error in data fetch. ${statusText}`;
    throw msg;
  }

  const data: T = await res.json();

  return data;
};

export const multiFetch = async (
  login: string
): Promise<ICommonGitHubResponse> => {
  const urls = buildUrls(login);
  const user = await fetchBase<IUserResponse>(urls.user);

  const followersRes = fetchBase<IFollowerResponse[]>(urls.followers);
  const reposRes = fetchBase<IRepoResponse[]>(urls.repos);
  const limitRes = fetchBase<ILimitResponse>(urls.limit);

  const [followers, repos, limit] = await Promise.all([
    followersRes,
    reposRes,
    limitRes,
  ]);

  return {
    user,
    repos,
    followers,
    limit,
  };
};
