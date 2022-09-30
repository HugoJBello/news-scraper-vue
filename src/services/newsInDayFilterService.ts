//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import type { NewScrapedI } from "@/models/NewScraped";

export const filterLastIterationOnly = (news: NewScrapedI[]): NewScrapedI[] => {
   const iterations = news.map(item => item.scrapingIteration)
   console.log(iterations)
   const max = Math.max.apply(null, iterations)
   return news.filter(item => item.scrapingIteration === max)
};
 