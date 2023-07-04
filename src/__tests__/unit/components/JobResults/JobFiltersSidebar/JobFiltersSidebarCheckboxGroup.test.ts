import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
import type { Mock } from "vitest";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

vi.mock("vue-router");

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    header: "Algum header",
    uniqueValues: new Set(["valor1", "valor2"]),
    action: vi.fn(),
    ...props
  });

  const renderJobFiltersSidebarCheckboxGroup = (props: {}) => {
    const pinia = createTestingPinia();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          IconifyIcon: true
        }
      }
    });
  };

  it("renderiza valores únicos (um set) a partir de uma lista", async () => {
    const props = createProps({
      header: "Tipos de vaga",
      uniqueValues: new Set(["tipo1", "tipo2"])
    });
    renderJobFiltersSidebarCheckboxGroup(props);

    const btn = screen.getByRole("button", {
      name: /tipos de vaga/i
    });

    await userEvent.click(btn);

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
        header: "Tipos de vaga",
        uniqueValues: new Set(["google", "amazon"]),
        action: action
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const orgsBtn = screen.getByRole("button", {
        name: /tipos de vaga/i
      });

      await userEvent.click(orgsBtn);

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
          header: "Tipos de vaga",
          uniqueValues: new Set(["Google"]),
          action: action
        });
        renderJobFiltersSidebarCheckboxGroup(props);

        const orgsBtn = screen.getByRole("button", {
          name: /tipos de vaga/i
        });

        await userEvent.click(orgsBtn);

        const checkBox = screen.getByRole("checkbox", {
          name: /google/i
        });

        await userEvent.click(checkBox);
        expect(push).toHaveBeenCalledWith({ name: "Vagas" });
      });
    });
  });
});
