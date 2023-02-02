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
//https://api.github.com/repos/HugoJBello/news-scraper-api/contents/current_deployment.json

//https://raw.githubusercontent.com/HugoJBello/news-scraper-api/main/current_deployment.json
const token2 = "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"
const token = "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"


//axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const config =  {headers:{
  "Authorization": "Bearer " + token2
}}

export class ApiDeploymentService {
  public static baseUrl = "https://api.github.com/repos/"
  public static user = "HugoJBello"
  public static repo = "news-scraper-api"
  public static file = "current_deployment.json"

  static getFromGithubApi = async (): Promise<CurrentDeploymentInfo> => {

    const url = this.baseUrl + this.user + "/"+ this.repo + "/contents/" + this.file


    const resp = await axios.get(url, config);
    
    const base64 =  get(resp, "data.content");
    console.log(base64)

    return JSON.parse(atob(base64))

  };

  static getLastDeploymentUrl =  async (): Promise<string> => {

    const url = LocalStorageService.getCustomUrl()
    const api = new ApiService(url as string)

    const isAlreadyWorking = await api.findGlobalConfig(undefined)
    if (isAlreadyWorking){
      return url as string
    }

    try{
      const currentInfo = await this.getFromGithubApi()
      console.log(currentInfo)
      return currentInfo.deployments[0].url
    } catch (err){
      console.log(err)
      return LocalStorageService.getCustomUrl() as string
    }


  }
}