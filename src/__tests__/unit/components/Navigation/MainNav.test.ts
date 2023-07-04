import MainNav from "@/components/Navigation/MainNav.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";

vi.mock("vue-router");

const renderMainNav = () => {
  const pinia = createTestingPinia({ stubActions: false });
  (useRoute as Mock).mockReturnValue({ name: "Home" });

  render(MainNav, {
    global: {
      plugins: [pinia],
      stubs: {
        IconifyIcon: true,
        RouterLink: RouterLinkStub
      }
    }
  });
};

describe("MainNav", () => {
  it("exibe a logo do site", () => {
    renderMainNav();

    const companyName = screen.getByText("emprega.ae");

    expect(companyName).toBeInTheDocument();
  });

  it("exibe os itens do menu de navegação", () => {
    renderMainNav();

    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuText = navMenuItems.map((item) => item.textContent);

    expect(navMenuText).toEqual(["Equipes", "Locais", "Alunos", "Vagas"]);
  });

  describe("quando o usuário fizer login", () => {
    it("exibe a foto de perfil", async () => {
      renderMainNav();

      let profileImg = screen.queryByRole("img", {
        name: /foto de perfil do usuário/i
      });
      expect(profileImg).not.toBeInTheDocument();

      const loginBtn = screen.getByRole("button", { name: /fazer login/i });
      await userEvent.click(loginBtn);

      profileImg = screen.getByRole("img", {
        name: /foto de perfil do usuário/i
      });
      expect(profileImg).toBeInTheDocument();
    });
  });
});
