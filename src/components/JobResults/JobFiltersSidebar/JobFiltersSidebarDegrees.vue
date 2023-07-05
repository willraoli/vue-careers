<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useDegreesStore } from "@/stores/degrees";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();
const degreesStore = useDegreesStore();
const uniqueDegrees = computed(() => degreesStore.uniqueDegrees);
</script>

<template>
  <job-filters-sidebar-checkbox-group
    :action="userStore.addSelectedDegrees"
    :unique-values="uniqueDegrees"
  />
</template>
