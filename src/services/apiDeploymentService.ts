//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import type { CurrentDeploymentInfo } from "@/models/CurrenDeploymentInfo";
import type { GlobalConfigI } from "@/models/GlobalConfigSql";
import type { NewScrapedI } from "@/models/NewScraped";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";
import axios from "axios";
import { get } from "lodash";
import { LocalStorageService } from "./localStorageService";

import Buffer from "buffer"
import { ApiService } from "./apiService";

//https://hjbello-api.netlify.app/api/news-scraper-api/current_deployment.json

export class ApiDeploymentService {
  public static baseUrl = "https://hjbello-api.netlify.app/api/news-scraper-api/"

  public static file = "current_deployment.json"

  static getFromStaticApi = async (): Promise<CurrentDeploymentInfo> => {

    const url = this.baseUrl + this.file

    const resp = await axios.get(url);
    
    const res =  get(resp, "data");

    return res

  };

  static getLastDeploymentUrl =  async (): Promise<string> => {

    const urlStored = LocalStorageService.getCustomUrl()
    const api = new ApiService(urlStored as string)

    try{
      const isAlreadyWorking = await api.findGlobalConfig(undefined)
    
      if (isAlreadyWorking && isAlreadyWorking.id){
        return urlStored as string
      }
    }catch(err){

    }
    

    try{
      const currentInfo = await this.getFromStaticApi()
      console.log(currentInfo)
      return currentInfo.deployments[0].url
    } catch (err){
      console.log(err)
      
      return urlStored as string
    }


  }
}