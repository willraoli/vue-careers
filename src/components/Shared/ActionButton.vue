<script lang="ts">
export default {
  name: "ActionButton",
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      validator(value: string) {
        return ["primary", "secondary"].includes(value);
      },
      default: "primary"
    }
  },
  computed: {
    btnClass() {
      return {
        [this.type]: true
      };
    }
  }
};
</script>

<template>
  <button :class="btnClass">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  @apply px-5 py-3 font-semibold;
}

.primary {
  @apply rounded bg-brand-blue-1 text-white hover:bg-brand-blue-1/95;
}

.secondary {
  @apply border-transparent bg-transparent text-brand-blue-1;
}
</style>
