<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    validator(value: string) {
      return ["primary", "secondary"].includes(value);
    },
    default: "primary"
  }
});

const btnClass = computed(() => {
  return {
    [props.type]: true
  };
});
</script>

<template>
  <button :class="btnClass">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  @apply px-5 py-3 font-semibold;
}

.primary {
  @apply rounded bg-brand-blue-1 text-white hover:bg-brand-blue-1/95;
}

.secondary {
  @apply border-transparent bg-transparent text-brand-blue-1;
}
</style>
