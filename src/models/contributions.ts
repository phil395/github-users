import type { IHeatmapChart } from "./charts";

// --------- grouping by time ---------

export interface DailyContributions {
  date: string; // like '2022-01-30'. There is no need to keep 'Date' object
  counter: number;
  colorLevel: number; // determines the coloring intensity of the graph
}

export type WeeklyContributions = DailyContributions[];

export interface YearContributions {
  year: number;
  data: WeeklyContributions[];
}

// --------- grouping by purpose ---------

export interface ContributionList {
  last: WeeklyContributions[]; // from https://github.com/USERNAME
  byYears: YearContributions[]; // from https://github.com/users/USERNAME/contributions
}

export interface ContributionCounters {
  total: number;
  lastYear: number;
  byMonths: IHeatmapChart[];
}

export interface IContributions {
  list: ContributionList;
  counters: ContributionCounters;
}
