import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";

describe("JobFiltersSidebarPrompt", () => {
  describe("quando o usuário clica em limpar filtros", () => {
    it("envia a mensagem para limpar todos os filtros de busca", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();

      render(JobFiltersSidebarPrompt, {
        global: {
          plugins: [pinia]
        }
      });

      const btn = screen.getByRole("button", {
        name: /limpar filtros/i
      });

      await userEvent.click(btn);
      expect(userStore.clearFilters).toHaveBeenCalled();
    });
  });
});
