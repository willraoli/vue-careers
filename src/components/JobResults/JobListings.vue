<script lang="ts">
import JobListing from "@/components/JobResults/JobListing.vue";
import axios from "axios";

export default {
  name: "JobListings",
  components: {
    JobListing
  },
  data() {
    return {
      jobs: []
    };
  },
  computed: {
    displayedJobs() {
      const pageNumber = (this.$route.query.page as unknown as number) || 1;
      const firstJobIdx = (pageNumber - 1) * 10;
      const lastJobIdx = pageNumber * 10;
      return this.jobs.slice(firstJobIdx, lastJobIdx);
    }
  },
  async mounted() {
    const res = await axios.get("http://localhost:3000/jobs");
    this.jobs = res.data;
  }
};
</script>

<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="(job, idx) in displayedJobs" :key="idx" :job="job" />
    </ol>
  </main>
</template>
