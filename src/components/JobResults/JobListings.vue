<script lang="ts">
import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobsStore, FETCH_JOBS } from "@/stores/jobs";
import { mapActions, mapState } from "pinia";

export default {
  name: "JobListings",
  components: {
    JobListing
  },
  computed: {
    ...mapState(useJobsStore, ["jobs"]),
    currentPage() {
      return Number.parseInt((this.$route.query.page as string) || "1");
    },
    previousPage() {
      const firstPage = 1;
      const previousPage = this.currentPage - 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIdx = (pageNumber - 1) * 10;
      const lastJobIdx = pageNumber * 10;
      return this.jobs.slice(firstJobIdx, lastJobIdx);
    }
  },
  async mounted() {
    this[FETCH_JOBS]();
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS])
  }
};
</script>

<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="(job, idx) in displayedJobs" :key="idx" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Página {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'Vagas', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Anterior
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'Vagas', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Próxima
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
