import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

describe("JobFiltersSidebarSkills", () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia]
      }
    });

    return { userStore };
  };
  it("popula o input de busca pela store", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "skill1";

    const input = await screen.findByRole<HTMLInputElement>("textbox");

    expect(input.value).toBe("skill1");
  });

  it("escreve o input do usuário para a store", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "";

    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "skill1");
    await userEvent.click(document.body);

    expect(userStore.updateSkillsSearchTerm).toHaveBeenCalledWith("skill1");
  });

  it("remove whitespace do input do usuário", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "";

    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "   skill1");
    await userEvent.click(document.body);

    expect(userStore.updateSkillsSearchTerm).toHaveBeenCalledWith("skill1");
  });
});
