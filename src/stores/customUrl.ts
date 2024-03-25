import { ApiService } from "@/services/apiService";
import { defineStore } from "pinia";

//const baseUrl = "http://localhost:3001/news"
const baseUrl = "https://fistular-olm-5800.dataplicity.io/news"

export const useCustomUrlStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "customUrl",
  state: () => ({ customUrlId: baseUrl as string | null, apiService: new ApiService(baseUrl) as  null | any}),
  getters: {
    // automatically infers the return type as a number
    getCustomUrl(state): string | null {
      return state.customUrlId
    },
    getApiService(state): any | null {
      return state.apiService
    }
  },
  actions: {
    selectCustomUrl(customUrl: string) {
      this.customUrlId = customUrl;
      console.log(customUrl)
      if (customUrl && this.apiService === null){
        this.apiService = new ApiService(customUrl)
      } else if (customUrl) {
        console.log(customUrl)
        this.apiService.baseUrl = customUrl
      }
    },
  },
});
