<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const paramsId = computed(() => route.params.id);
</script>

<template>
  <div>job page {{ paramsId }}</div>
</template>
