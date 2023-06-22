<script lang="ts">
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

export default {
  name: "TeamsView",
  components: { HeaderContainer }
};
</script>

<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Equipes</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        Um ótimo lugar para trabalhar. Junte-se a nós!
      </h2>
    </template>
  </header-container>
</template>
