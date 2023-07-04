<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  uniqueValues: {
    type: Set<string>,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
});

const router = useRouter();
const selectedValues = ref<string[]>([]);

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "Vagas" });
};
</script>

<template>
  <collapsible-accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-grow flex-wrap">
          <li v-for="(value, idx) in uniqueValues" :key="idx" class="h-8 w-1/2">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              class="mr-3"
              type="checkbox"
              @change="selectValue"
            />
            <label :for="value" class="select-none">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
