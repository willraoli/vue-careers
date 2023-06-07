import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobView from "@/views/JobView.vue";
import JobResultsView from "@/views/JobResultsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/vagas/resultados",
    name: "Vagas",
    component: JobResultsView
  },
  {
    path: "/vagas/resultados/:id",
    name: "Vaga",
    component: JobView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
