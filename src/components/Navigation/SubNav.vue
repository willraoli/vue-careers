<script setup lang="ts">
import { useJobsStore } from "@/stores/jobs";
import { computed } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();
const jobsStore = useJobsStore();
const filteredJobs = computed(() => jobsStore.filteredJobs);
const onJobResultsPage = computed(() => router.name === "Vagas");
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
