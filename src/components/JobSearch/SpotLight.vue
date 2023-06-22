<script lang="ts">
import axios from "axios";

type Spotlight = {
  img: string;
  title: string;
  description: string;
};

export default {
  name: "SpotLight",
  data() {
    return {
      spotlights: [] as Spotlight[]
    };
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/spotlights`;

    const res = await axios.get(url);
    this.spotlights = res.data;
  }
};
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
