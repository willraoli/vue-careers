import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          IconifyIcon: true
        }
      },
      props: {
        header: "Categoria"
      },
      slots: {
        default: "<h3>Slot</h3>"
      },
      ...config
    });
  };

  it("renderiza os componentes-filho (slots)", async () => {
    renderCollapsibleAccordion();
    expect(screen.queryByText("Slot")).not.toBeInTheDocument();

    const btn = screen.getByRole("button", {
      name: /categoria/i
    });

    await userEvent.click(btn);
    expect(screen.getByText("Slot")).toBeInTheDocument();
  });

  describe("quando o componente-pai não recebe componente-filho", () => {
    it("renderiza fallback content", async () => {
      renderCollapsibleAccordion({ slots: {} });

      const btn = screen.getByRole("button", {
        name: /categoria/i
      });

      await userEvent.click(btn);
      expect(screen.getByText("placeholder")).toBeInTheDocument();
    });
  });
});
