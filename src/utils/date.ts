const defaultOptions: Intl.DateTimeFormatOptions = {
  // weekday: 'long',
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = defaultOptions
) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
};

const monthsMap = new Map([
  [0, "Jan"],
  [1, "Feb"],
  [2, "Mar"],
  [3, "Apr"],
  [4, "May"],
  [5, "Jun"],
  [6, "Jul"],
  [7, "Aug"],
  [8, "Sep"],
  [9, "Oct"],
  [10, "Nov"],
  [11, "Dec"],
]);

export const getMonthName = (date: Date): string => {
  return monthsMap.get(date.getMonth()) ?? "";
};
