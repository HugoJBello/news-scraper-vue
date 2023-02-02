import { ApiService } from "@/services/apiService";
import { defineStore } from "pinia";

export const useCustomUrlStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "customUrl",
  state: () => ({ customUrlId: null as string | null, apiService: new ApiService() as  null | any}),
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
      if (this.apiService === null){
        this.apiService = new ApiService(customUrl)
      } else {
        this.apiService.baseUrl = customUrl
      }
    },
  },
});
