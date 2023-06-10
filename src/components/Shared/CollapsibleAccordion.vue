<script lang="ts">
export default {
  name: "CollapsibleAccordion",
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
    <div class="flex flex-wrap items-center justify-between hover:cursor-pointer" @click="open">
      <h3 class="select-none text-base font-semibold">Empresas</h3>
      <iconify-icon :icon="caretIcon" width="12" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot></slot>
    </div>
  </div>
</template>
