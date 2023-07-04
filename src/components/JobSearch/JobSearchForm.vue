<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const role = ref("");
const location = ref("");

const searchJobs = () => {
  router.push({
    name: "Vagas",
    query: {
      role: role.value,
      location: location.value
    }
  });
};
</script>

<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
    @submit.prevent="searchJobs"
  >
    <iconify-icon class="ml-4 mr-3" icon="material-symbols:search-rounded" width="24" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3 hover:shadow-brand-blue-3">
        <label for="roleInput" class="absolute -top-9 left-0">Cargo</label>
        <text-input id="roleInput" v-model="role" placeholder="Engenheiro" />
      </div>
      <span
        class="flex h-full cursor-default items-center border-x border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        em
      </span>
      <div class="relative flex h-full flex-1 items-center pl-4 hover:shadow-brand-blue-3">
        <label for="locationInput" class="absolute -top-9 left-0 ml-4">Onde?</label>
        <text-input id="locationInput" v-model="location" placeholder="Brasil" />
      </div>
      <action-button text="Pesquisar" type="secondary" />
    </div>
  </form>
</template>
