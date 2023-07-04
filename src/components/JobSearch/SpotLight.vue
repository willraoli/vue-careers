<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

type Spotlight = {
  img: string;
  title: string;
  description: string;
};

const spotlights = ref<Spotlight[]>([]);
const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;

  const res = await axios.get(url);
  spotlights.value = res.data;
};

onMounted(getSpotlights);
</script>

<template>
  <ul>
    <li v-for="(spotlight, idx) in spotlights" :key="idx">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>
