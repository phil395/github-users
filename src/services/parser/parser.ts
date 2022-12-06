// other
import { curry, formatDate } from "@utils";
import { getContributionsCounters } from "./calculation";
// types
import { IAchievement } from "@models/achievement";
import type {
  IDailyContribution,
  IWeeklyContribution,
  IYearContribution,
} from "@models/contributions";
import { IParsedData } from "@models/parsedData";
//

const SELECTORS = {
  // from 'view-source:https://github.com/wesbos'
  graph: "svg.js-calendar-graph-svg g",
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

const selectGraph = (document: Document, selector: string): Element => {
  const graphTag = document.querySelector(selector);
  if (!graphTag) throw new Error("Svg graph not found");
  return graphTag;
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

const parseContributions = (svg: Element): IWeeklyContribution[] => {
  const weeksElements = svg?.querySelectorAll("g");

  return [...weeksElements].map((weekElement) => {
    const dayElements = weekElement.querySelectorAll("rect");

    return [...dayElements].map<IDailyContribution>((dayElement) => ({
      date: dayElement.getAttribute("data-date") ?? "",
      counter: parseInt(dayElement.getAttribute("data-count") ?? ""),
      colorLevel: parseInt(dayElement.getAttribute("data-level") ?? ""),
    })) as IWeeklyContribution;
  });
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

const getContributions = (document: Document): IWeeklyContribution[] => {
  const graphNode = selectGraph(document, SELECTORS.graph);
  return parseContributions(graphNode);
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

  return pages.map<IYearContribution>(({ year, page }) => ({
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
