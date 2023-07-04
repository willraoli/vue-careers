<script setup lang="ts">
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>

<template>
  <div class="flex flex-row flex-nowrap">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>
