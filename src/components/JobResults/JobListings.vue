<script setup lang="ts">
import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobsStore, FETCH_JOBS } from "@/stores/jobs";
import { usePreviousAndNextPages } from "@/utils/usePreviousAndNextPages";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const jobsStore = useJobsStore();
const filteredJobs = computed(() => jobsStore.filteredJobs);
const currentPage = computed(() => Number.parseInt((route.query.page as string) || "1"));
const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10));
const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIdx = (pageNumber - 1) * 10;
  const lastJobIdx = pageNumber * 10;

  return filteredJobs.value.slice(firstJobIdx, lastJobIdx);
});

onMounted(jobsStore[FETCH_JOBS]);
</script>

<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="(job, idx) in displayedJobs" :key="idx" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Página {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'Vagas', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Anterior
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'Vagas', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Próxima
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
