<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

const jobPageLink = computed(() => `/vagas/resultados/${props.job.id}`);
</script>

<template>
  <li class="mb-7">
    <router-link
      :to="jobPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-1 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pb-2 pt-5">
        <h2 class="mb-2 text-2xl font-semibold tracking-tight">{{ job.title }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{ job.organization }}</span>
          </div>
          <ul>
            <li v-for="location in job.locations" :key="location" class="mr-5 inline-block">
              {{ location }}
            </li>
          </ul>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mb-2 mt-1">Requisitos:</h3>
          <div>
            <ul class="list-disc pl-8">
              <li v-for="qualification in job.minimumQualifications" :key="qualification">
                {{ qualification }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-7 mt-2 text-center">
        <router-link :to="jobPageLink" class="font-semibold text-brand-blue-1">
          Ver mais
        </router-link>
      </div>
    </router-link>
  </li>
</template>
