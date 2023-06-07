<script lang="ts">
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink: "https://placehold.co/250x250/000000/FFF?text=*"
    };
  }
};
</script>

<template>
  <img
    :src="imageLink"
    alt="Foto de perfil do usuário"
    class="h-8 w-8 rounded-full object-contain hover:cursor-pointer"
  />
</template>
