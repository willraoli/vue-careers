<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarJobTypes",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedJobTypes: [] as string[]
    };
  },
  computed: {
    ...mapState(useJobsStore, ["uniqueJobTypes"])
  },
  methods: {
    ...mapActions(useUserStore, ["addSelectedJobTypes"]),
    selectJobType() {
      this.addSelectedJobTypes(this.selectedJobTypes);
      this.$router.push({ name: "Vagas" });
    }
  }
};
</script>

<template>
  <collapsible-accordion header="Tipos de vaga">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-grow flex-wrap">
          <li v-for="(jobType, idx) in uniqueJobTypes" :key="idx" class="h-8 w-1/2">
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              class="mr-3"
              type="checkbox"
              @change="selectJobType"
            />
            <label :for="jobType" class="select-none">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
