import type { IRepo } from "./repos";

export interface IBaseChart {
  name: string;
  value: number;
}

export type ILanguagesChart = IBaseChart;

export type IStarsChart = IBaseChart;

export interface IReposChart
  extends Pick<IRepo, "forks" | "watchers" | "stars" | "url"> {
  name: string;
  // forks: number;
  // watchers: number;
  // stars: number;
  // url: string;
}

/** Describes data for each language in languages charts */
export interface ILanguageCounters {
  frequency: number /* for top languages chart */;
  stars: number /* for stars by language chart */;
}

/** Sorting type in top repos chart  */
export type ReposSortType = Extract<
  "stars" | "watchers" | "forks",
  keyof IReposChart
>;

export interface IHeatmapChart {
  year: string;
  month: string;
  value: number;
}
