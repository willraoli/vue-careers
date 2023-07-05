import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrgs = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  const loginUser = () => (isLoggedIn.value = true);
  const addSelectedOrgs = (orgs: string[]) => (selectedOrgs.value = orgs);
  const addSelectedDegrees = (degrees: string[]) => (selectedDegrees.value = degrees);
  const addSelectedJobTypes = (jobTypes: string[]) => (selectedJobTypes.value = jobTypes);
  const clearFilters = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrgs.value = [];
  };

  return {
    isLoggedIn,
    selectedOrgs,
    selectedJobTypes,
    selectedDegrees,
    loginUser,
    addSelectedOrgs,
    addSelectedDegrees,
    addSelectedJobTypes,
    clearFilters
  };
});
