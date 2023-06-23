import getJobs from "@/api/getJobs";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";

type Job = {
  organization: string;
  jobType: string;
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
    uniqueJobTypes(state) {
      const uniqueJobTypes = new Set<string>();

      state.jobs.forEach((job: Job) => {
        uniqueJobTypes.add(job.jobType);
      });

      return uniqueJobTypes;
    },
    includeJobByJobType() {
      return function (job: Job) {
        const userStore = useUserStore();

        if (userStore.selectedJobTypes.length === 0) return true;
        return userStore.selectedJobTypes.includes(job.jobType);
      };
    },
    includeJobByOrg() {
      return function (job: Job) {
        const userStore = useUserStore();

        if (userStore.selectedOrgs.length === 0) return true;
        return userStore.selectedOrgs.includes(job.organization);
      };
    },
    filteredJobs(state): Job[] {
      return state.jobs
        .filter((job) => this.includeJobByOrg(job))
        .filter((job) => this.includeJobByJobType(job));
    }
  }
});
