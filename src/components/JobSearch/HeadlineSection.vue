<script setup lang="ts">
import getNextElement from "@/utils/getNextElement";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const text = ref("Vagas");
const interval = ref<ReturnType<typeof setInterval>>();

const animationClasses = computed(() => {
  return {
    [text.value.toLowerCase()]: true
  };
});

const changeTitle = () => {
  const duration = 3000;

  interval.value = setInterval(() => {
    const textArr = ["Vagas", "Empregos", "Cursos"];

    text.value = getNextElement(textArr, text.value);
  }, duration);
};

onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="animationClasses">{{ text }}</span>
      <br />
      para todos
    </h1>
    <h2 class="text-3xl font-light tracking-tight">Encontre seu próximo desafio no Vue Careers</h2>
  </section>
</template>

<style scoped>
.vagas {
  color: #1a73e8;
}

.empregos {
  color: #34a853;
}

.cursos {
  color: #d93025;
}
</style>
