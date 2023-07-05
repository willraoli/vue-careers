<script setup lang="ts">
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarJobTypes from "./JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarDegrees from "./JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarOrgs from "./JobFiltersSidebarOrgs.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <job-filters-sidebar-prompt />
      <collapsible-accordion header="Empresas">
        <job-filters-sidebar-orgs />
      </collapsible-accordion>
      <collapsible-accordion header="Tipo de vaga">
        <job-filters-sidebar-job-types />
      </collapsible-accordion>
      <collapsible-accordion header="Nível de formação">
        <job-filters-sidebar-degrees />
      </collapsible-accordion>
    </section>
  </div>
</template>
