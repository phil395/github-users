import type { IAchievement } from "./achievement";
import type { IContributions } from "./contributions";

// result parse HTML (https://github.com/USERNAME and https://github.com/users/USERNAME/contributions)

export interface IParsedData {
  createdAt: string;
  login: string;
  achievements: IAchievement[];
  contributions: IContributions;
  /* contributions: IContributionList;
	contributionCounters: IContributionCounters; */
}
