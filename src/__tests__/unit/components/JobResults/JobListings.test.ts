import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore, FETCH_JOBS } from "@/stores/jobs";

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1"
    },
    ...queryParams
  });

  const renderJobListings = ($route: {}) => {
    const pinia = createTestingPinia();

    return render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub
        },
        mocks: {
          $route
        }
      }
    });
  };

  it("dá fetch nas vagas", () => {
    renderJobListings(createRoute());
    const jobsStore = useJobsStore();
    expect(jobsStore[FETCH_JOBS]).toHaveBeenCalled();
  });

  it("cria no máximo 10 anúncios", async () => {
    const queryParams = { query: { page: "1" } };
    renderJobListings(createRoute(queryParams));
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({}) as [];

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("quando não tem page nos params", () => {
    it("mostra a página 1", () => {
      const queryParams = { query: { page: undefined } };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      expect(screen.getByText("Página 1")).toBeInTheDocument();
    });
  });

  describe("quando tem page nos params", () => {
    it("mostra o número da página", () => {
      const queryParams = { query: { page: "3" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      expect(screen.getByText("Página 3")).toBeInTheDocument();
    });
  });

  describe("quando o usuário está na primeira página", () => {
    it("não mostra o botão Anterior", async () => {
      const queryParams = { query: { page: "1" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({}) as [];

      await screen.findAllByRole("listitem");
      const previousText = screen.queryByRole("link", {
        name: /anterior/i
      });

      expect(previousText).not.toBeInTheDocument();
    });

    it("mostra o botão Próxima", async () => {
      const queryParams = { query: { page: "1" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({}) as [];

      await screen.findAllByRole("listitem");
      const nextText = screen.queryByRole("link", {
        name: /próxima/i
      });

      expect(nextText).toBeInTheDocument();
    });
  });

  describe("quando o usuário está na última página", () => {
    it("não mostra o botão Próxima", async () => {
      const queryParams = { query: { page: "2" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({}) as [];

      await screen.findAllByRole("listitem");
      const nextText = screen.queryByRole("link", {
        name: /próxima/i
      });

      expect(nextText).not.toBeInTheDocument();
    });

    it("mostra o botão Anterior", async () => {
      const queryParams = { query: { page: "2" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({}) as [];

      await screen.findAllByRole("listitem");
      const previousText = screen.queryByRole("link", {
        name: /anterior/i
      });

      expect(previousText).toBeInTheDocument();
    });
  });
});
