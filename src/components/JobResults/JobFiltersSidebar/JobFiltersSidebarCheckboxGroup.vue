<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  uniqueValues: {
    type: [Set<string>, Array<string>],
    required: true
  },
  action: {
    type: Function,
    required: true
  }
});

const router = useRouter();
const userStore = useUserStore();
const selectedValues = ref<string[]>([]);

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "Vagas" });
};

userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === "clearFilters") {
      selectedValues.value = [];
    }
  });
});
</script>

<template>
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
</template>
