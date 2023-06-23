import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          IconifyIcon: true
        },
        mocks: {
          $router
        }
      }
    });

    return { jobsStore, userStore, $router };
  };

  it("renderiza tipos de vaga únicos (um set) a partir das vagas", async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes();
    // @ts-expect-error: Getter is read only
    jobsStore.uniqueJobTypes = new Set(["Google", "Amazon"]);

    const btn = screen.getByRole("button", {
      name: /tipos de vaga/i
    });

    await userEvent.click(btn);

    const jobTypeItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypeItems.map((item) => item.textContent);

    expect(jobTypes).toEqual(["Google", "Amazon"]);
  });

  describe("quando o usuário seleciona um tipo de vaga", () => {
    it("renderiza somente vagas do tipo selecionado", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes();
      // @ts-expect-error: Getter is read only
      jobsStore.uniqueJobTypes = new Set(["Google", "Amazon"]);

      const orgsBtn = screen.getByRole("button", {
        name: /tipos de vaga/i
      });

      await userEvent.click(orgsBtn);

      const checkBox = screen.getByRole("checkbox", {
        name: /google/i
      });

      await userEvent.click(checkBox);
      expect(userStore.addSelectedJobTypes).toHaveBeenCalledWith(["Google"]);
    });

    describe("quando o usuário clica na checkbox", () => {
      it("redireciona o usuário para a página de vagas", async () => {
        const { jobsStore, $router } = renderJobFiltersSidebarJobTypes();
        // @ts-expect-error: Getter is read only
        jobsStore.uniqueJobTypes = new Set(["Google", "Amazon"]);

        const orgsBtn = screen.getByRole("button", {
          name: /tipos de vaga/i
        });

        await userEvent.click(orgsBtn);

        const checkBox = screen.getByRole("checkbox", {
          name: /google/i
        });

        await userEvent.click(checkBox);
        expect($router.push).toHaveBeenCalledWith({ name: "Vagas" });
      });
    });
  });
});
