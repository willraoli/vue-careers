<script lang="ts">
import MainNav from "@/components/Navigation/MainNav.vue";

export default {
  name: "App",
  components: { MainNav }
};
</script>

<template>
  <main-nav />
  <router-view />
</template>
