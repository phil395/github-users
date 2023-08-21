// other
import { curry, formatDate } from "@utils";
import { getContributionsCounters } from "./calculation";
// types
import { IAchievement } from "@models/achievement";
import type {
  DailyContributions,
  WeeklyContributions,
  YearContributions,
} from "@models/contributions";
import { IParsedData } from "@models/parsedData";
//

const SELECTORS = {
  day: {
    element: "[data-date][data-level]",
    attributes: {
      date: "data-date",
      level: "data-level",
    }
  },
  years: [
    '#year-list-container li a[id^="year-link"]',
    '#js-contribution-activity li a[id^="year-link"]',
  ],
  achievements: 'img[data-hovercard-type="achievement"]',
};

type AchievementsTag = {
  imgTag: Element;
  counterTag: Element | null;
};

const buildUrl = (login: string, year: number) => {
  const origin = "https://github-users.yhajoa.workers.dev";
  const pathname = `/users/${login}/contributions`;
  const searchParams = new URLSearchParams({
    from: new Date(`${year}`).toLocaleDateString("sv"),
    to: new Date(year, 11, 31).toLocaleDateString("sv"),
  });

  return `${origin}${pathname}?${searchParams.toString()}`;
};

const fetchHtmlByUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) throw "Bad response. Contributions not found";

  const text = await response.text();

  return text;
};

const buildDocument = (htmlText: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(htmlText, "text/html");
};

const selectDays = (document: Document, dayElementSelector: string): Element[] => {
  const days = document.querySelectorAll(dayElementSelector);
  if (!days.length) {
    throw new Error(`Could not find the 'days' on the github page
    by the specified selector: '${dayElementSelector}'`)
  };
  return Array.from(days);
};

const selectYears = (
  document: Document,
  selector: string
): NodeListOf<Element> => {
  const yearsTags = document.querySelectorAll(selector);
  return yearsTags;
};

const selectAchievements = (
  document: Document,
  selector: string
): AchievementsTag[] => {
  const imgTags = document.querySelectorAll(selector);
  // if (!imgTags) throw new Error('Achievements tags not found');
  // if (imgTags.length === 0) return []

  return [...imgTags].map((img) => ({
    imgTag: img,
    counterTag: img.nextElementSibling,
  }));
};


const parseContributions = (dayElements: Element[]): WeeklyContributions[] => {
  const result: WeeklyContributions[] = []
  const days: DailyContributions[] = []
  for (const dayEl of dayElements) {
    const childText = dayEl.children[0].textContent
    const dateStr = dayEl.getAttribute(SELECTORS.day.attributes.date)
    const level = dayEl.getAttribute(SELECTORS.day.attributes.level)
    if (!childText || !dateStr || !level) {
      throw new Error('Could not parse the daily contributions')
    }
    const day: DailyContributions = {
      date: dateStr,
      colorLevel: parseInt(level),
      counter: parseInt(childText) || 0,
    }
    days.push(day)
  }
  days.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  let firstDayNumber = new Date(days[0].date).getDay()
  let week: WeeklyContributions = []
  for (const day of days) {
    if (week.length === 7 - firstDayNumber) {
      result.push(week)
      week = []
      firstDayNumber = 0
    }
    week.push(day)
  }
  if (week.length) result.push(week)
  return result
};

const parseYears = (nodes: NodeListOf<Element>): number[] => {
  return Array.from(nodes).map((node) => parseInt(node.textContent ?? ""));
};

const parseAchievements = (tagsSet: AchievementsTag[]): IAchievement[] => {
  return tagsSet.map(({ imgTag, counterTag }) => ({
    name: (imgTag.getAttribute("alt") ?? "").replace("Achievement: ", ""),
    thumbnail: imgTag.getAttribute("src") ?? "",
    count: counterTag
      ? parseInt((counterTag.textContent ?? "").replace("x", ""))
      : 1,
  }));
};

type uniqueObject =
  | { name: string; }
  | { id: string | number; }
  | { login: string; };

const removeDuplicates = <T extends uniqueObject>(set: T[]) => {
  const map = set.map((el) => {
    if ("id" in el) return el.id;
    if ("login" in el) return el.login;
    if ("name" in el) return el.name;
    return null;
  });
  return set.filter((el, i) => {
    if ("id" in el) return !map.includes(el.id, i + 1);
    if ("login" in el) return !map.includes(el.login, i + 1);
    if ("name" in el) return !map.includes(el.name, i + 1);

    return true;
  });
};

// -------------------

const getUserPage = async (login: string): Promise<Document> => {
  const url = `https://github-users.yhajoa.workers.dev/${login}`;
  const htmlText = await fetchHtmlByUrl(url);
  return buildDocument(htmlText);
};

type ContributionsPageByYear = {
  year: number;
  page: Document;
};

const getContributionsPage = async (
  login: string,
  year: number = new Date().getFullYear()
): Promise<ContributionsPageByYear> => {
  const url = buildUrl(login, year);
  const htmlText = await fetchHtmlByUrl(url);
  return {
    year,
    page: buildDocument(htmlText),
  };
};

const getContributions = (document: Document): WeeklyContributions[] => {
  const days = selectDays(document, SELECTORS.day.element);
  return parseContributions(days);
};

const getYears = (document: Document): number[] => {
  for (const selector of SELECTORS.years) {
    const yearsNodes = selectYears(document, selector);
    if (yearsNodes.length > 0) return parseYears(yearsNodes);
  }

  throw new Error("Years tags not found");
};

const getAchievements = (document: Document): IAchievement[] => {
  const achieveNodes = selectAchievements(document, SELECTORS.achievements);
  if (achieveNodes.length === 0) return [];
  return curry(removeDuplicates)(parseAchievements)(achieveNodes);
};

const getContributionsByYears = async (login: string, years: number[]) => {
  const reqByPages = years.map((year) => getContributionsPage(login, year));
  const pages = await Promise.all(reqByPages);

  return pages.map<YearContributions>(({ year, page }) => ({
    year,
    data: getContributions(page),
  }));
};

export const parserRun = async (login: string): Promise<IParsedData> => {
  /* Parse main Page */
  const userPage = await getUserPage(login);
  const lastContributions = getContributions(userPage); // last years contributions
  const achievements = getAchievements(userPage);
  const years = getYears(userPage);

  /* Parse all contributions Pages */
  const allContributions = await getContributionsByYears(login, years);

  /** Calculation data for charts */
  const counters = getContributionsCounters(
    allContributions,
    lastContributions
  );

  return {
    createdAt: formatDate(new Date()),
    login,
    achievements,
    contributions: {
      list: {
        last: lastContributions,
        byYears: allContributions,
      },
      counters: counters,
    },
  };
};
