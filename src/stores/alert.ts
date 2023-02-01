import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "alert",
  state: () => ({ alertText: null as string | null, alertType: null as string | null}),
  getters: {
    // automatically infers the return type as a number
    getAlertText(state): string | null {
      return state.alertText
    },
    getAlertType(state): string | null {
      return state.alertType
    }
  },
  actions: {
    setAlert(text: string, type: string) {
      this.alertText = text;
      this.alertType = type;
    },
  },
});
