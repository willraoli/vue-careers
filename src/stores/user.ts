import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedOrgs: [] as string[],
    selectedJobTypes: [] as string[],
    selectedDegrees: [] as string[]
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    addSelectedOrgs(orgs: string[]) {
      this.selectedOrgs = orgs;
    },
    addSelectedJobTypes(types: string[]) {
      this.selectedJobTypes = types;
    },
    addSelectedDegrees(degrees: string[]) {
      this.selectedDegrees = degrees;
    }
  }
});
