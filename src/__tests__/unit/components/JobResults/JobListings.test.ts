import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore, FETCH_JOBS } from "@/stores/jobs";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";
import { useDegreesStore } from "@/stores/degrees";
import type { Job } from "@/api/types";

vi.mock("vue-router");

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    jobsStore.jobs = Array<Job>(15).fill({
      title: "title",
      organization: "org",
      jobType: "jobtype",
      degree: "degree"
    });

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub
        }
      }
    });

    return { jobsStore };
  };

  it("dá fetch nas vagas", () => {
    (useRoute as Mock).mockReturnValue({ query: {} });
    renderJobListings();
    const jobsStore = useJobsStore();
    expect(jobsStore[FETCH_JOBS]).toHaveBeenCalled();
  });

  it("dá fetch nos títulos", () => {
    (useRoute as Mock).mockReturnValue({ query: {} });
    renderJobListings();
    const degreesStore = useDegreesStore();
    expect(degreesStore.fetchDegrees).toHaveBeenCalled();
  });

  it("cria no máximo 10 anúncios", async () => {
    (useRoute as Mock).mockReturnValue({ query: { page: "1" } });
    renderJobListings();

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("quando não tem page nos params", () => {
    it("mostra a página 1", () => {
      (useRoute as Mock).mockReturnValue({ query: { page: undefined } });

      renderJobListings();

      expect(screen.getByText("Página 1")).toBeInTheDocument();
    });
  });

  describe("quando tem page nos params", () => {
    it("mostra o número da página", () => {
      (useRoute as Mock).mockReturnValue({ query: { page: "3" } });

      renderJobListings();

      expect(screen.getByText("Página 3")).toBeInTheDocument();
    });
  });

  describe("quando o usuário está na primeira página", () => {
    it("não mostra o botão Anterior", async () => {
      (useRoute as Mock).mockReturnValue({ query: { page: "1" } });

      renderJobListings();

      await screen.findAllByRole("listitem");
      const previousText = screen.queryByRole("link", {
        name: /anterior/i
      });

      expect(previousText).not.toBeInTheDocument();
    });

    it("mostra o botão Próxima", async () => {
      (useRoute as Mock).mockReturnValue({ query: { page: "1" } });

      renderJobListings();

      await screen.findAllByRole("listitem");
      const nextText = screen.queryByRole("link", {
        name: /próxima/i
      });

      expect(nextText).toBeInTheDocument();
    });
  });

  describe("quando o usuário está na última página", () => {
    it("não mostra o botão Próxima", async () => {
      (useRoute as Mock).mockReturnValue({ query: { page: "2" } });

      renderJobListings();

      await screen.findAllByRole("listitem");
      const nextText = screen.queryByRole("link", {
        name: /próxima/i
      });

      expect(nextText).not.toBeInTheDocument();
    });

    it("mostra o botão Anterior", async () => {
      (useRoute as Mock).mockReturnValue({ query: { page: "2" } });

      renderJobListings();

      await screen.findAllByRole("listitem");
      const previousText = screen.queryByRole("link", {
        name: /anterior/i
      });

      expect(previousText).toBeInTheDocument();
    });
  });
});
