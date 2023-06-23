<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useJobsStore, UNIQUE_ORGS } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrgs: [] as string[]
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGS])
  },
  methods: {
    ...mapActions(useUserStore, ["addSelectedOrgs"]),
    selectOrg() {
      this.addSelectedOrgs(this.selectedOrgs);
    }
  }
};
</script>

<template>
  <collapsible-accordion header="Empresas">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-grow flex-wrap">
          <li v-for="(org, idx) in UNIQUE_ORGS" :key="idx" class="h-8 w-1/2">
            <input
              :id="org"
              v-model="selectedOrgs"
              :value="org"
              class="mr-3"
              type="checkbox"
              @change="selectOrg"
            />
            <label :for="org" class="select-none">{{ org }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
