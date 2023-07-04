<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";
import { UNIQUE_ORGS, useJobsStore } from "@/stores/jobs";
import { computed } from "vue";

const userStore = useUserStore();
const jobsStore = useJobsStore();
const uniqueJobs = computed(() => jobsStore.uniqueJobTypes);
const uniqueOrgs = computed(() => jobsStore[UNIQUE_ORGS]);
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">O que você quer fazer?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Limpar filtros" type="secondary" />
        </div>
      </div>
      <job-filters-sidebar-checkbox-group
        header="Empresas"
        :action="userStore.addSelectedOrgs"
        :unique-values="uniqueOrgs"
      />
      <job-filters-sidebar-checkbox-group
        header="Tipo de vaga"
        :action="userStore.addSelectedJobTypes"
        :unique-values="uniqueJobs"
      />
      <collapsible-accordion header="Formação" />
    </section>
  </div>
</template>
