import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "@/App.vue";
import "@/index.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).component("iconify-icon", Icon).mount("#app");
