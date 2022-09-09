//https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=8888&orderByParam=createdAt&orderDirection=ASC
import axios from "axios";
import { get } from "lodash";

const baseUrl =
  "https://walrus-app-kitxm.ondigitalocean.app/news-scraper-api2/api/v1/";

export const getAllIndexes = async () => {
  const url =
    baseUrl +
    "scrapingIndex/findQuery?&limit=99999&orderByParam=createdAt&orderDirection=ASC";
  const resp = await axios.get(url);
  return get(resp, "data.payload.rows");
};
