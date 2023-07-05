<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">O que você quer fazer?</h3>
    <div class="flex items-center text-sm">
      <action-button text="Limpar filtros" type="secondary" @click="userStore.clearFilters" />
    </div>
  </div>
</template>
