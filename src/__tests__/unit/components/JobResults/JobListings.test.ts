import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import axios from "axios";
import type { Mock } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5"
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
});
