<script lang="ts">
export default {
  name: "CollapsibleAccordion",
  props: {
    header: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? "fa6-solid:angle-down" : "fa6-solid:angle-up";
    }
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    }
  }
};
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
