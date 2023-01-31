//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import type { GlobalConfigSqlSqlI } from "@/models/GlobalConfigSql";
import type { NewScrapedI } from "@/models/NewScraped";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";
import axios from "axios";
import { get } from "lodash";
import { LocalStorageService } from "./localStorageService";
//http://localhost:3000/api/v1/scrapingIndex/findQuery?newspaper=eldiario.es&limit=6&orderByParam=createdAt&orderDirection=DESC

const apiUrl = LocalStorageService.getCustomUrl()
const defaultBaseUrl = apiUrl;


axios.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";


export class ApiService {
  public baseUrl = defaultBaseUrl
  constructor(baseUrl?: string) {
    
    if (baseUrl){
      this.baseUrl = baseUrl
    }
  }

  getAllIndexes = async (): Promise<ScrapingIndexI[]> => {
    const url =
      this.baseUrl +
      "/api/v1/scrapingIndex/findQuery?&limit=99999&orderByParam=createdAt&orderDirection=ASC";
    const resp = await axios.get(url);
    return get(resp, "data.payload.rows") as ScrapingIndexI[];
  };

  getAllScrapers = async (): Promise<string[]> => {
    const indexes = await this.getAllIndexes()

    indexes.sort((a, b) => {
      return -(new Date(a.dateScraping) as any) + (new Date(b.dateScraping) as any);
    });

    const scraperIds = indexes.map(item => item.scraperId)
    const setScraper = new Set(scraperIds)
    return Array.from(setScraper.values());

  };

  getIndex = async (newspaper: string, scraperId: string | null | undefined): Promise<ScrapingIndexI> => {
    let url: string
    if (scraperId) {
      url =
      this.baseUrl + "/api/v1/scrapingIndex/findQuery?&limit=1&newspaper=" + newspaper + "&scraperId=" + scraperId;
    } else {
      url =
      this.baseUrl + "/api/v1/scrapingIndex/findQuery?&limit=1&newspaper=" + newspaper;
    }

    const resp = await axios.get(url);
    return get(resp, "data.payload.rows[0]") as ScrapingIndexI;
  };



  getNewsItem = async (id: string): Promise<NewScrapedI> => {
    const url = this.baseUrl + "/api/v1/newScraped/findQuery?&limit=1&id=" + id;
    const resp = await axios.get(url);
    return get(resp, "data.payload.rows")[0];
  };

  //https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findNewsInDay?newspaper=eldiario.es&day=2022-09-14&orderCriteria=priority&daysInterval=2

  private formatDate = (date: Date): string => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  };

  ////http://localhost:3000/api/v1/globalConfig/findQuery?limit=6&orderByParam=createdAt&orderDirection=DESC
  public findGlobalConfig = async (
    scraperId: string | null | undefined
  ): Promise<GlobalConfigSqlSqlI> => {
    
    let url: string;

    if (scraperId) {
      url =
        this.baseUrl +
        "/api/v1/globalConfig/findQuery?limit=9999&orderByParam=createdAt&orderDirection=DESC&scraperId=" +
        scraperId;
    } else {
      url =
        this.baseUrl +
        "/api/v1/globalConfig/findQuery?limit=9999&orderByParam=createdAt&orderDirection=DESC"
    }


    const resp = await axios.get(url);

    const globalConfigSqlSqlI =  get(resp, "data.payload.rows")[0] as GlobalConfigSqlSqlI;
    if (globalConfigSqlSqlI){
      globalConfigSqlSqlI.lastActive = new Date(globalConfigSqlSqlI.lastActive)
    }
    return globalConfigSqlSqlI
  }

  public findNewsInDay = async (
    newspaper: string,
    day: Date,
    daysInterval: number,
    scraperId: string | null | undefined
  ): Promise<NewScrapedI[]> => {
    const date = this.formatDate(day);
    let url: string;

    if (scraperId) {
      url =
        this.baseUrl +
        "/api/v1/newScraped/findNewsInDay?newspaper=" +
        newspaper +
        "&day=" +
        date +
        "&daysInterval=" +
        daysInterval +
        "&orderCriteria=priority" +
        "&scraperId=" + scraperId;
    } else {
      url =
        this.baseUrl +
        "/api/v1/newScraped/findNewsInDay?newspaper=" +
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

}
