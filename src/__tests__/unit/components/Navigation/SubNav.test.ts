import SubNav from "@/components/Navigation/SubNav.vue";
import { useJobsStore } from "@/stores/jobs";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

describe("SubNav", () => {
  const renderSubNav = (routeName: string) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const $route = {
      name: routeName
    };

    render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route
        },
        stubs: {
          IconifyIcon: true
        }
      }
    });

    return { jobsStore };
  };

  describe("quando o usuário está na página de vagas", () => {
    it("mostra a quantidade de vagas", async () => {
      const { jobsStore } = renderSubNav("Vagas");
      const jobNumber = 10;
      // @ts-expect-error: Getter is read only
      jobsStore.filteredJobsByOrg = Array(jobNumber).fill({});
      const jobCount = await screen.findByText(jobNumber);

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("quando o usuário não está na página de vagas", () => {
    it("não exibe a quantidade de vagas", () => {
      const { jobsStore } = renderSubNav("Home");
      const jobNumber = 10;
      // @ts-expect-error: Getter is read only
      jobsStore.filteredJobsByOrg = Array(jobNumber).fill({});

      const jobCount = screen.queryByText(jobNumber);

      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
