import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobView from "@/views/JobView.vue";
import JobResultsView from "@/views/JobResultsView.vue";
import TeamsView from "@/views/TeamsView.vue";

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
  },
  {
    path: "/equipes",
    name: "Equipes",
    component: TeamsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  }
});

export default router;
