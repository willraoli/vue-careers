import { render, screen } from "@testing-library/vue";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renderiza texto", () => {
    render(ActionButton, {
      props: {
        text: "abc",
        type: "primary"
      }
    });

    const btn = screen.getByRole("button", {
      name: /abc/i
    });

    expect(btn).toBeInTheDocument();
  });

  it("aplica estilos", () => {
    render(ActionButton, {
      props: {
        text: "abc",
        type: "secondary"
      }
    });

    const btn = screen.getByRole("button", {
      name: /abc/i
    });

    expect(btn).toHaveClass("secondary");
  });

  it("aplica estilos padrão", () => {
    render(ActionButton, {
      props: {
        text: "abc"
      }
    });

    const btn = screen.getByRole("button", {
      name: /abc/i
    });

    expect(btn).toHaveClass("primary");
  });
});
