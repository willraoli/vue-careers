<script lang="ts">
import { mapState } from "pinia";
import { useJobsStore } from "@/stores/jobs";

export default {
  name: "SubNav",
  computed: {
    ...mapState(useJobsStore, ["filteredJobs"]),
    onJobResultsPage() {
      return this.$route.name === "Vagas";
    }
  }
};
</script>

<template>
  <div
    v-if="onJobResultsPage"
    class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white"
  >
    <div class="flex h-full items-center px-8">
      <iconify-icon class="mr-3" icon="material-symbols:search-rounded" width="24" />
      <span
        ><span class="text-brand-green-1">{{ filteredJobs.length }}</span> vagas encontradas</span
      >
    </div>
  </div>
</template>
