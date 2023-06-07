import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("quando o usuário submete o form", () => {
    it("redireciona para a página de vagas com os parâmetros do usuário", async () => {
      const push = vi.fn();
      const $router = {
        push
      };

      render(JobSearchForm, {
        global: {
          stubs: {
            IconifyIcon: true
          },
          mocks: {
            $router
          }
        }
      });

      const roleInput = screen.getByRole("textbox", {
        name: /cargo/i
      });
      const locationInput = screen.getByRole("textbox", {
        name: /onde\?/i
      });
      const submitBtn = screen.getByRole("button", {
        name: /pesquisar/i
      });

      await userEvent.type(roleInput, "dev");
      await userEvent.type(locationInput, "brasil");
      await userEvent.click(submitBtn);

      expect(push).toHaveBeenCalledWith({
        name: "Vagas",
        query: {
          role: "dev",
          location: "brasil"
        }
      });
    });
  });
});
