import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import axios from "axios";
import type { Mock } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1"
    },
    ...queryParams
  });

  const renderJobListings = ($route: {}) => {
    return render(JobListings, {
      global: {
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
    (axios.get as Mock).mockResolvedValue({ data: [] });
    renderJobListings(createRoute());
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("cria no máximo 10 anúncios", async () => {
    (axios.get as Mock).mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { query: { page: "1" } };
    renderJobListings(createRoute(queryParams));

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
      (axios.get as Mock).mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { query: { page: "1" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      await screen.findAllByRole("listitem");
      const previousText = screen.queryByRole("link", {
        name: /anterior/i
      });

      expect(previousText).not.toBeInTheDocument();
    });

    it("mostra o botão Próxima", async () => {
      (axios.get as Mock).mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { query: { page: "1" } };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      await screen.findAllByRole("listitem");
      const nextText = screen.queryByRole("link", {
        name: /próxima/i
      });

      expect(nextText).toBeInTheDocument();
    });
  });
});
