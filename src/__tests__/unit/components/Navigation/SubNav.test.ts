import SubNav from "@/components/Navigation/SubNav.vue";
import { useJobsStore } from "@/stores/jobs";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";
import type { Mock } from "vitest";
import { useRoute } from "vue-router";

vi.mock("vue-router");

describe("SubNav", () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          IconifyIcon: true
        }
      }
    });

    return { jobsStore };
  };

  describe("quando o usuário está na página de vagas", () => {
    it("mostra a quantidade de vagas", async () => {
      (useRoute as Mock).mockReturnValue({ name: "Vagas" });
      const { jobsStore } = renderSubNav();
      const jobNumber = 10;
      // @ts-expect-error: Getter is read only
      jobsStore.filteredJobs = Array(jobNumber).fill({});
      const jobCount = await screen.findByText(jobNumber);

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("quando o usuário não está na página de vagas", () => {
    it("não exibe a quantidade de vagas", () => {
      (useRoute as Mock).mockReturnValue({ name: "Home" });
      const { jobsStore } = renderSubNav();
      const jobNumber = 10;
      // @ts-expect-error: Getter is read only
      jobsStore.filteredJobs = Array(jobNumber).fill({});

      const jobCount = screen.queryByText(jobNumber);

      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
