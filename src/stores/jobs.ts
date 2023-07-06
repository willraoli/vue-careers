import getJobs from "@/api/getJobs";
import type { Job } from "@/api/types";
import { useUserStore } from "@/stores/user";
import { defineStore } from "pinia";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGS = "UNIQUE_ORGS";

interface JobsState {
  jobs: Job[];
}

export const useJobsStore = defineStore("jobs", {
  state: (): JobsState => ({
    jobs: []
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
    includeJobByDegree() {
      return function (job: Job) {
        const userStore = useUserStore();

        if (userStore.selectedDegrees.length === 0) return true;
        return userStore.selectedDegrees.includes(job.degree);
      };
    },
    includeJobBySkill() {
      return function (job: Job) {
        const userStore = useUserStore();

        return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase());
      };
    },
    filteredJobs(state): Job[] {
      return state.jobs
        .filter((job) => this.includeJobByOrg(job))
        .filter((job) => this.includeJobByJobType(job))
        .filter((job) => this.includeJobByDegree(job))
        .filter((job) => this.includeJobBySkill(job));
    }
  }
});
