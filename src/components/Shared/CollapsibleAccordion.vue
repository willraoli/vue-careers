<script setup lang="ts">
import { ref, computed } from "vue";

defineProps({
  header: {
    type: String,
    required: true
  }
});

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() => (isOpen.value ? "fa6-solid:angle-up" : "fa6-solid:angle-down"));
</script>

<template>
  <div class="border-b border-solid border-brand-gray-1 py-5">
    <div
      class="flex flex-wrap items-center justify-between hover:cursor-pointer"
      role="button"
      @click="open"
    >
      <h3 class="select-none text-base font-semibold">{{ header }}</h3>
      <iconify-icon :icon="caretIcon" width="12" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>placeholder</slot>
    </div>
  </div>
</template>
