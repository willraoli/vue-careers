import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { UNIQUE_ORGS, useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

describe("JobFiltersSidebarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          IconifyIcon: true
        }
      }
    });

    return { jobsStore, userStore };
  };

  it("renderiza empresas únicas (um set) a partir das vagas", async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();
    // @ts-expect-error: Getter is read only
    jobsStore[UNIQUE_ORGS] = new Set(["Google", "Amazon"]);

    const btn = screen.getByRole("button", {
      name: /empresas/i
    });

    await userEvent.click(btn);

    const orgItems = screen.getAllByRole("listitem");
    const orgs = orgItems.map((item) => item.textContent);

    expect(orgs).toEqual(["Google", "Amazon"]);
  });

  describe("quando o usuário seleciona uma empresa", () => {
    it("renderiza somente vagas da empresa selecionada", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations();
      // @ts-expect-error: Getter is read only
      jobsStore[UNIQUE_ORGS] = new Set(["Google", "Amazon"]);

      const orgsBtn = screen.getByRole("button", {
        name: /empresas/i
      });

      await userEvent.click(orgsBtn);

      const checkBox = screen.getByRole("checkbox", {
        name: /google/i
      });

      await userEvent.click(checkBox);
      expect(userStore.addSelectedOrgs).toHaveBeenCalledWith(["Google"]);
    });
  });
});
