<script lang="ts">
export default {
  name: "TextInput",
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ["update:model-value"],
  methods: {
    handleInput(event: Event) {
      this.$emit("update:model-value", (event.target as HTMLInputElement).value);
    }
  }
};
</script>

<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    :value="modelValue"
    @input="handleInput"
  />
</template>
