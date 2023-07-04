<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["update:model-value"]);

const handleInput = (event: Event) => {
  emit("update:model-value", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    :value="props.modelValue"
    @input="handleInput"
  />
</template>
