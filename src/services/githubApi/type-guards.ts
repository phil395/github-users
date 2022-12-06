// types
import type { GitHubResponse, SuccessfulGitHubResponse } from "./responses.types";

export const isSuccessfulResponse = (res: GitHubResponse): res is SuccessfulGitHubResponse => {
	if ('message' in res && res.message === 'Not Found') return false;
	return true;
};

