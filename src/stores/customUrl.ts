import { defineStore } from "pinia";

export const useCustomUrlStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "customUrl",
  state: () => ({ customUrlId: null as string | null }),
  getters: {
    // automatically infers the return type as a number
    getCustomUrl(state): string | null {
      return state.customUrlId
    }
  },
  actions: {
    selectCustomUrl(customUrl: string) {
      this.customUrlId = customUrl;
    },
  },
});
