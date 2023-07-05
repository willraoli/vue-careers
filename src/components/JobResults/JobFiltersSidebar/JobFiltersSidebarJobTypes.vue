<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();
const jobsStore = useJobsStore();
const uniqueJobs = computed(() => jobsStore.uniqueJobTypes);
</script>

<template>
  <job-filters-sidebar-checkbox-group
    :action="userStore.addSelectedJobTypes"
    :unique-values="uniqueJobs"
  />
</template>
