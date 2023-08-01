// others
import { getMonthName } from "@utils";
// types
import type { WeeklyContributions } from "@models/contributions";

type findIndexArg = {
  indexInArray: number;
  arrayLength: number;
  date: string;
};

export type GraphSizes = {
  cell: number;
  gap: number;
  borderR: number;
  textRowHeight: number;
};

export const getGraphWidth = (sizes: GraphSizes, weekQty: number) =>
  (sizes.cell + sizes.gap) * weekQty;

export const getGraphHeight = (sizes: GraphSizes) =>
  (sizes.cell + sizes.gap) * 7 + sizes.textRowHeight;

export const getLeftOffsetOfWeekGroup = (
  sizes: GraphSizes,
  weekIndex: number
) => (sizes.cell + sizes.gap) * weekIndex + 1;

export const getBottomOffsetOfDay = (sizes: GraphSizes, dayIndex: number) =>
  (sizes.cell + sizes.gap) * dayIndex;

export const findIndexOfDay = ({
  indexInArray,
  arrayLength,
  date,
}: findIndexArg): number => {
  const isFullWeek = arrayLength === 7;
  if (isFullWeek) return indexInArray;

  return new Date(date).getDay();
};

export const calculateTotal = (list: WeeklyContributions[]): number => {
  return list.reduce(
    (acc, weekData) =>
      acc +
      weekData.reduce((innerAcc, dayData) => innerAcc + dayData.counter, 0),
    0
  );
};

// for render mounts names

export const getMonthsNameRenderMap = (
  sizes: GraphSizes,
  weeksList: WeeklyContributions[]
) => {
  const map: {
    [year: number]: {
      [month: string]: number;
    };
  } = {};

  weeksList.forEach((week, weekIndex) => {
    if (week.length !== 7) return;

    const firstDayOfWeek = new Date(week[0].date);
    const month: string = getMonthName(firstDayOfWeek);
    const year = firstDayOfWeek.getFullYear();

    if (map[year]?.[month]) return;

    map[year] = {
      ...map[year],
      [month]: getLeftOffsetOfWeekGroup(sizes, weekIndex),
    };
  });

  const mapForRenderMonths: {
    month: string;
    offset: number;
  }[] = [];

  for (const year in map) {
    for (const month in map[year]) {
      mapForRenderMonths.push({
        month,
        offset: map[year][month],
      });
    }
  }

  return mapForRenderMonths;
};
