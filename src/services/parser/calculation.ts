// other
import { getMonthName } from "@utils";
// types
import { IHeatmapChart } from "@models/charts";
import {
	ContributionCounters,
	WeeklyContributions,
	YearContributions,
} from "@models/contributions";


export const getContributionsCounters = (
	contributionsByYears: YearContributions[],
	lastYearContributions: WeeklyContributions[]
): ContributionCounters => {
	const byMonths = calculateDataForHeatmap(contributionsByYears);
	const lastYear = calculateTotalInLastYear(lastYearContributions);
	const total = calculationTotal(byMonths);

	return {
		byMonths,
		lastYear,
		total,
	};
};

const calculationTotal = (dataByMonths: IHeatmapChart[]) => {
	return dataByMonths.reduce((acc, month) => acc + month.value, 0);
};

const calculateTotalInLastYear = (list: WeeklyContributions[]): number => {
	return list.reduce(
		(acc, weekData) =>
			acc +
			weekData.reduce((innerAcc, dayData) => innerAcc + dayData.counter, 0),
		0
	);
};

/** Calculate data for heatmap Chart */
const calculateDataForHeatmap = (contributions: YearContributions[]) => {
	// implementation #1
	// console.time('implementation #1');
	const map: {
		[year: string]: {
			[month: string]: number;
		};
	} = {};

	for (const year of contributions) {
		for (const week of year.data) {
			for (const day of week) {
				const month = getMonthName(new Date(day.date));

				if (year.year in map) {
					if (month in map[year.year]) {
						map[year.year][month] += day.counter;
						continue;
					} else {
						map[year.year][month] = day.counter;
						continue;
					}
				}

				map[year.year] = {
					[month]: day.counter,
				};
			}
		}
	}
	// console.timeEnd('implementation #1');	// 8-10 ms

	const data: IHeatmapChart[] = [];

	for (const year in map) {
		for (const month in map[year]) {
			data.push({
				year,
				month,
				value: map[year][month],
			});
		}
	}

	return data;
	/*
		{
			// ======================================== implementation #2
			console.time('implementation #2');
			const map = new Map() as Map<string, number>;

			for (const year of contributions) {
				for (const week of year.data) {
					for (const day of week) {
						const month = montsMap.get(new Date(day.date).getMonth())!;

						const key = `${year}.${month}`;
						const prevValue = map.get(key) ?? 0;
						map.set(key, prevValue + day.counter);
					}
				}
			}
			console.timeEnd('implementation #2');	 // 12-15 ms

		}

		{
			// ======================================== implementation #3
			console.time('implementation #3');
			for (const year of contributions) {
				for (const week of year.data) {
					for (const day of week) {
						const month = formatDate(day.date, {			// So slow
							month: 'short'
						});

						if (year.year in map) {
							if (month in map[year.year]) {
								map[year.year][month] += day.counter;
								continue;
							}
							else {
								map[year.year][month] = day.counter;
								continue;
							}
						}

						map[year.year] = {
							[month]: day.counter
						};
					}
				}
			}
			console.timeEnd('implementation #3');  // 600 - 800 ms
		}


		{
			// ======================================== implementation #4
			console.time('implementation #4');
			const map = contributions.reduce((map, year) => {
				year.data.forEach(weak => {
					weak.forEach(day => {
						const key = `${year}.${montsMap.get(new Date(day.date).getMonth())}`;
						const prevValue = map.get(key) ?? 0;
						map.set(key, prevValue + day.counter);
					});
				});

				return map;
			}, new Map() as Map<string, number>);
			console.timeEnd('implementation #4');			// 12-15 ms
		}

	 */
};
