import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "loading",
  state: () => ({ loading: false}),
  getters: {
    // automatically infers the return type as a number
    getLoading(state): boolean {
      return state.loading
    },
  },
  actions: {
    setAlert(loading: boolean) {
      this.loading = loading;
    },
  },
});
