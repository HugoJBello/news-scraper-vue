//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import type { NewScrapedI } from "@/models/NewScraped";

export const filterLastIterationOnly = (news: NewScrapedI[]): NewScrapedI[] => {
   const iterations = news.map(item => item.scrapingIteration)
   const newsCopy = [... news];
   
   newsCopy.sort(function(a,b){
      return (a.scrapedAt as any) - ( b.scrapedAt as any);
    });

   const lastScraped = newsCopy[newsCopy.length -1] 
   //const max = Math.max.apply(null, iterations)
   const max = lastScraped.scrapingIteration
   console.log(max, lastScraped.scrapedAt)
   const newsFiltered =  news.filter(item => (item.scrapingIteration === max || item.scrapingIteration=== max ))
   newsFiltered.sort((a,b)=>{
      return (a.newsIndex as any) - ( b.newsIndex as any);

   })
   newsFiltered.sort((a,b)=>{
      return (a.scrapingIteration as any) - ( b.scrapingIteration as any);

   })
   return newsFiltered
};
 