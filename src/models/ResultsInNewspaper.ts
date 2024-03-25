import type { NewScrapedI } from "./NewScraped";
import type { ScrapingIndexI } from "./ScrapingIndex";


export interface ResultsInNewspaper {
    dateScraping: Date;
    newspaper: string;
    scrapingIndex: ScrapingIndexI
    news: NewScrapedI[];
    scraperId: string;
    deviceId: string;
    logoUrl: string;
    tag: string;
    id:number;
  }
    
  