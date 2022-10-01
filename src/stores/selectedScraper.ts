import { defineStore } from "pinia";

export const useSelectedScraperStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "selectedScraper",
  state: () => ({ selectedScraperId: null as string | null }),
  getters: {
    // automatically infers the return type as a number
    getSelectedScraper(state): string | null {
      return state.selectedScraperId
    }
  },
  actions: {
    selectScraper(scraperId: string) {
      this.selectedScraperId = scraperId;
    },
  },
});
