//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import type { GlobalConfigSqlSqlI } from "@/models/GlobalConfigSql";
import type { NewScrapedI } from "@/models/NewScraped";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";
import axios from "axios";
import { get } from "lodash";
import type { ApiService } from "./apiService";
import { LocalStorageService } from "./localStorageService";

//http://localhost:3000/api/v1/scrapingIndex/findQuery?newspaper=eldiario.es&limit=6&orderByParam=createdAt&orderDirection=DESC

const deflastScraperId = LocalStorageService.getSelectedScraper()


export class ServerActivityService {
  public apiService: ApiService | undefined;
  public lastScraperId: string | undefined | null;
  public thredshold: number = 5 * 60 * 1000

  constructor(apiService: ApiService) {
    this.lastScraperId = deflastScraperId
    if (apiService){
      this.apiService = apiService
    }
  }

  public getLastActiveService = async (scraperId: string | undefined | null): Promise<GlobalConfigSqlSqlI | undefined> => {
    if (!scraperId){
      scraperId = this.lastScraperId
    }
    try{
      return await this.apiService?.findGlobalConfig(scraperId)
    } catch (err){
      return undefined
    }
  }

  public isActive(globalConfig: GlobalConfigSqlSqlI): boolean {
    if (!globalConfig) return false

    return (Date.now() - globalConfig.lastActive.getTime()) <= this.thredshold
  }

}
