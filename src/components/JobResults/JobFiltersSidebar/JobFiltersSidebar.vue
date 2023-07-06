<script setup lang="ts">
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarOrgs from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrgs.vue";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();

const parseSearchTerms = () => {
  const role = (route.query.role as string) || "";

  userStore.updateSkillsSearchTerm(role);
};

onMounted(parseSearchTerms);
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <job-filters-sidebar-prompt />
      <job-filters-sidebar-skills />
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
