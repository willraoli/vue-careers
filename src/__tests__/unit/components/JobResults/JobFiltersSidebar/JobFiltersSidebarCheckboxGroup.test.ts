import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
import type { Mock } from "vitest";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";

vi.mock("vue-router");

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    uniqueValues: new Set(["valor1", "valor2"]),
    action: vi.fn(),
    ...props
  });

  const renderJobFiltersSidebarCheckboxGroup = (props: {}) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    });

    return { userStore };
  };

  it("renderiza valores únicos (um set) a partir de uma lista", () => {
    const props = createProps({
      uniqueValues: new Set(["tipo1", "tipo2"])
    });
    renderJobFiltersSidebarCheckboxGroup(props);

    const jobTypeItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypeItems.map((item) => item.textContent);

    expect(jobTypes).toEqual(["tipo1", "tipo2"]);
  });

  describe("quando o usuário seleciona um valor", () => {
    it("renderiza somente vagas do tipo selecionado", async () => {
      const push = vi.fn();
      (useRouter as Mock).mockReturnValue({ push });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["google", "amazon"]),
        action: action
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const checkBox = screen.getByRole("checkbox", {
        name: /google/i
      });

      await userEvent.click(checkBox);
      expect(action).toHaveBeenCalledWith(["google"]);
    });

    describe("quando o usuário clica na checkbox", () => {
      it("redireciona o usuário para a página de vagas", async () => {
        const push = vi.fn();
        (useRouter as Mock).mockReturnValue({ push });
        const action = vi.fn();
        const props = createProps({
          uniqueValues: new Set(["Google"]),
          action: action
        });
        renderJobFiltersSidebarCheckboxGroup(props);

        const checkBox = screen.getByRole("checkbox", {
          name: /google/i
        });

        await userEvent.click(checkBox);
        expect(push).toHaveBeenCalledWith({ name: "Vagas" });
      });
    });
  });

  describe("quando o usuário limpa os filtros", () => {
    it("desmarca todas as checkboxes marcadas", async () => {
      (useRouter as Mock).mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["Google"]),
        action: action
      });
      const { userStore } = renderJobFiltersSidebarCheckboxGroup(props);

      const checkboxBeforeChecking = screen.getByRole<HTMLInputElement>("checkbox", {
        name: /google/i
      });

      await userEvent.click(checkboxBeforeChecking);
      expect(checkboxBeforeChecking.checked).toBe(true);

      userStore.clearFilters();

      const checkboxAfterChecking = await screen.findByRole<HTMLInputElement>("checkbox", {
        name: /google/i
      });
      expect(checkboxAfterChecking.checked).toBe(false);
    });
  });
});
