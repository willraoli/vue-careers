import SubNav from "@/components/Navigation/SubNav.vue";
import { render, screen } from "@testing-library/vue";

describe("SubNav", () => {
  const renderSubNav = (routeName: string) => {
    const $route = {
      name: routeName
    };

    render(SubNav, {
      global: {
        mocks: {
          $route
        },
        stubs: {
          IconifyIcon: true
        }
      }
    });
  };

  describe("quando o usuário está na página de vagas", () => {
    it("mostra a quantidade de vagas", () => {
      renderSubNav("Vagas");
      const jobCount = screen.getByText(/1234/i);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("quando o usuário não está na página de vagas", () => {
    it("não exibe a quantidade de vagas", () => {
      renderSubNav("Home");
      const jobCount = screen.queryByText(/1234/i);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
