// types
import type { ILanguageCounters, ReposSortType } from "@models/charts";
import type { IRepo, ISortedRepos } from "@models/repos";


const LANGUAGES_QTY_ON_CHART = 6;
const REPOS_QTY_ON_CHART = 7;

/** Compute values for 2 charts: top languages, stars by language.
 *
 * @returns two-dimensional array sorted by frequency of use of languages.
 * Example [['javascript', { frequency: 10, stars: 250 }], ['python', { frequency: 7, stars: 261 }], ...]
 */
export const calculationLanguagesCharts = (
  repos: IRepo[]
): [string, ILanguageCounters][] => {
  /* making frequency map */
  const map = repos.reduce<Record<string, ILanguageCounters>>((map, repo) => {
    const language = repo.language;
    const stars = repo.stars;

    if (language in map) {
      map[language] = {
        frequency: map[language].frequency + 1,
        stars: map[language].stars + stars,
      };
    } else {
      map[language] = {
        frequency: 1,
        stars: stars,
      };
    }

    return map;
  }, {});

  const arr = Object.entries(map);
  const sortedArr = arr.sort((a, b) => b[1].frequency - a[1].frequency);

  if (sortedArr.length <= 7) return sortedArr;

  const mostPopular = sortedArr.slice(0, LANGUAGES_QTY_ON_CHART);
  const other = sortedArr.slice(LANGUAGES_QTY_ON_CHART);

  const otherCounters = other.reduce(
    // eslint-disable-next-line
    (acc: ILanguageCounters, [_, counters]) => {
      acc.frequency += counters.frequency;
      acc.stars += counters.stars;

      return acc;
    },
    { frequency: 0, stars: 0 }
  );

  return [...mostPopular, ["Other", otherCounters]];
};

/** Compute values for top repos chart
 * 	@returns sorted repos by 3 group
 */
export const calculationReposChart = (repos: IRepo[]): ISortedRepos => {
  const sortBy = (type: ReposSortType): IRepo[] => {
    return [...repos]
      .sort((a, b) => b[type] - a[type])
      .slice(0, REPOS_QTY_ON_CHART);
  };

  return {
    byStars: sortBy("stars"),
    byForks: sortBy("forks"),
    byWatchers: sortBy("watchers"),
  };
};
