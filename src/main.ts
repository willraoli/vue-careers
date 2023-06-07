import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import router from "@/router";
import App from "@/App.vue";
import "@/index.css";

createApp(App).use(router).component("iconify-icon", Icon).mount("#app");
