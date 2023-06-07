<script lang="ts">
export default {
  name: "JobView",
  computed: {
    paramsId() {
      return this.$route.params.id;
    }
  }
};
</script>

<template>
  <div>job page {{ paramsId }}</div>
</template>
