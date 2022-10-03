//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import type { NewScrapedI } from "@/models/NewScraped";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";
import axios from "axios";
import { get } from "lodash";

//http://localhost:3000/api/v1/scrapingIndex/findQuery?newspaper=eldiario.es&limit=6&orderByParam=createdAt&orderDirection=DESC

const baseUrl =
  "https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/";

export const getAllIndexes = async (): Promise<ScrapingIndexI[]> => {
  const url =
    baseUrl +
    "scrapingIndex/findQuery?&limit=99999&orderByParam=createdAt&orderDirection=ASC";
  const resp = await axios.get(url);
  return get(resp, "data.payload.rows") as ScrapingIndexI[];
};

export const getAllScrapers = async (): Promise<string[]> => {
  const indexes = await getAllIndexes()

  indexes.sort((a, b) => {
    return -(new Date(a.dateScraping) as any) + (new Date(b.dateScraping) as any);
  });

  const scraperIds = indexes.map(item => item.scraperId)
  const setScraper = new Set(scraperIds)
 return Array.from(setScraper.values());

};

export const getIndex = async (newspaper: string, scraperId: string | null | undefined): Promise<ScrapingIndexI> => {
  let url: string
  if (scraperId){
    url =
    baseUrl + "scrapingIndex/findQuery?&limit=1&newspaper=" + newspaper + "&scraperId=" + scraperId;
  }else {
    url =
    baseUrl + "scrapingIndex/findQuery?&limit=1&newspaper=" + newspaper;
  }
  
  const resp = await axios.get(url);
  return get(resp, "data.payload.rows[0]") as ScrapingIndexI;
};

export const getNewsItem = async (id: string): Promise<NewScrapedI> => {
  const url = baseUrl + "newScraped/findQuery?&limit=1&id=" + id;
  const resp = await axios.get(url);
  return get(resp, "data.payload.rows")[0];
};

//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findNewsInDay?newspaper=eldiario.es&day=2022-09-14&orderCriteria=priority&daysInterval=2

const formatDate = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

export const findNewsInDay = async (
  newspaper: string,
  day: Date,
  daysInterval: number,
  scraperId: string | null | undefined
): Promise<NewScrapedI[]> => {
  const date = formatDate(day);
  let url: string;

  if (scraperId){
    url =
    baseUrl +
    "newScraped/findNewsInDay?newspaper=" +
    newspaper +
    "&day=" +
    date +
    "&daysInterval=" +
    daysInterval +
    "&orderCriteria=priority" + 
    "&scraperId=" + scraperId;
  } else {
    url =
    baseUrl +
    "newScraped/findNewsInDay?newspaper=" +
    newspaper +
    "&day=" +
    date +
    "&daysInterval=" +
    daysInterval +
    "&orderCriteria=priority";
  }
  
  const resp = await axios.get(url);

  return get(resp, "data.payload.rows") as NewScrapedI[];
};
