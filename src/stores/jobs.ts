import getJobs from "@/api/getJobs";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";

type Job = {
  organization: string;
};

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGS = "UNIQUE_ORGS";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [] as Job[]
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    }
  },
  getters: {
    [UNIQUE_ORGS](state) {
      const uniqueOrgs = new Set<string>();
      state.jobs.forEach((job: Job) => {
        uniqueOrgs.add(job.organization);
      });

      return uniqueOrgs;
    },
    filteredJobsByOrg(state) {
      const userStore = useUserStore();

      if (userStore.selectedOrgs.length === 0) {
        return state.jobs;
      }

      return state.jobs.filter((job) => userStore.selectedOrgs.includes(job.organization));
    }
  }
});
