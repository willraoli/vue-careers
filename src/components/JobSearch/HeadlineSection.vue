<script lang="ts">
import getNextElement from "@/utils/getNextElement";

export default {
  name: "HeadlineSection",
  data() {
    return {
      text: "Vagas",
      interval: 0
    };
  },
  computed: {
    animationClasses() {
      return {
        [this.text.toLowerCase()]: true
      };
    }
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    window.clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      const duration = 3000;

      this.interval = window.setInterval(() => {
        const textArr = ["Vagas", "Empregos", "Cursos"];
        this.text = getNextElement(textArr, this.text);
      }, duration);
    }
  }
};
</script>

<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="animationClasses">{{ text }}</span>
      <br />
      para todos
    </h1>
    <h2 class="text-3xl font-light tracking-tight">Encontre seu próximo desafio no emprega.ae</h2>
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
