import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedOrgs: [] as string[]
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    addSelectedOrgs(orgs: string[]) {
      this.selectedOrgs = orgs;
    }
  }
});
