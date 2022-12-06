import type { IHeatmapChart } from "./charts";

// --------- grouping by time ---------

export interface IDailyContribution {
  date: string; // like '2022-01-30'. There is no need to keep 'Date' object
  counter: number;
  colorLevel: number; // determines the coloring intensity of the graph
}

/** Tuple with max 7 elements (7 days in week) */
export type IWeeklyContribution = [
  IDailyContribution,
  ...IDailyContribution[]
] & { length: 1 | 2 | 3 | 4 | 5 | 6 | 7; };

export interface IYearContribution {
  year: number;
  data: IWeeklyContribution[];
}

// --------- grouping by purpose ---------

export interface IContributionList {
  last: IWeeklyContribution[]; // from https://github.com/USERNAME
  byYears: IYearContribution[]; // from https://github.com/users/USERNAME/contributions
}

export interface IContributionCounters {
  total: number;
  lastYear: number;
  byMonths: IHeatmapChart[];
}

export interface IContributions {
  list: IContributionList;
  counters: IContributionCounters;
}
