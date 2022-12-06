export interface IRepo {
  id: number;
  name: string;
  url: string;

  language: string;
  forks: number;
  watchers: number;
  stars: number;
}

export interface ISortedRepos {
  byStars: IRepo[];
  byForks: IRepo[];
  byWatchers: IRepo[];
}
