import getDegrees from "@/api/getDegrees";
import type { Degree } from "@/api/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref<Degree[]>([]);
  const uniqueDegrees = computed(() => degrees.value.map((item) => item.degree));

  const fetchDegrees = async () => {
    const res = await getDegrees();

    degrees.value = res;
  };

  return { degrees, fetchDegrees, uniqueDegrees };
});
