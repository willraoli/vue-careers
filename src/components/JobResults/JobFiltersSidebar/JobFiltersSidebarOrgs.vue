<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";
import { UNIQUE_ORGS, useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();
const jobsStore = useJobsStore();
const uniqueOrgs = computed(() => jobsStore[UNIQUE_ORGS]);
</script>
<template>
  <job-filters-sidebar-checkbox-group
    :action="userStore.addSelectedOrgs"
    :unique-values="uniqueOrgs"
  />
</template>
