



export interface ScrapingIndexI {
  dateScraping: Date;
  urlIndex: number;
  pageNewIndex: number;
  pageIndexSection: number;
  maxPages: number;
  newspaper: string;
  reviewsSource: string;
  startingUrls: string[];
  currentScrapingIdList: string[];
  currentScrapingUrlList: string[];
  scraperId: string;
  deviceId: string;
  logoUrl: string;
  id:number;
  scrapingIteration:number;
}

export const joiningStr = "====="

