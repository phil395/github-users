export interface ITableData {
  avatar: string;
  login: string;
  starsQty: number;
  achievementsQty: number;
  languagesQty: number;
  reposQty: number;
  followers: number;
  following: number;
  contributionsQty: {
    total: number;
    lastYear: number;
  };
  createdAt: string;
}
