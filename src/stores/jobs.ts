import getJobs from "@/api/getJobs";
import { defineStore } from "pinia";

export const FETCH_JOBS = "FETCH_JOBS";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    }
  }
});
