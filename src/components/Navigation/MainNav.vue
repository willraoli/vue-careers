<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";
import { useUserStore } from "@/stores/user";
import { mapActions, mapState } from "pinia";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav
  },
  data() {
    return {
      company: "emprega.ae",
      menuItems: [
        { label: "Equipes", href: "/equipes" },
        { label: "Locais", href: "/" },
        { label: "Alunos", href: "/" },
        { label: "Vagas", href: "/vagas/resultados" }
      ]
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn
      };
    }
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"])
  }
};
</script>

<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8">
        <router-link class="flex h-full items-center text-xl" :to="{ name: 'Home' }">
          {{ company }}
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none gap-9">
            <li v-for="menuItem in menuItems" :key="menuItem.label" class="h-full">
              <router-link :to="menuItem.href" class="flex h-full items-center py-2.5">
                {{ menuItem.label }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" @click="loginUser" />
          <action-button v-else type="primary" text="Fazer login" @click="loginUser" />
        </div>
      </div>
      <sub-nav v-if="isLoggedIn" />
    </div>
  </header>
</template>
