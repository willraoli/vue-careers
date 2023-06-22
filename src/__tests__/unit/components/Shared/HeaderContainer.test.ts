import { render, screen } from "@testing-library/vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("permite adicionar um título", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h1>título</h1>"
      }
    });
    const text = screen.getByText(/título/i);
    expect(text).toBeInTheDocument();
  });

  it("permite adicionar um subtítulo", () => {
    render(HeaderContainer, {
      slots: {
        subtitle: "<h2>sub</h2>"
      }
    });
    const text = screen.getByText(/sub/i);
    expect(text).toBeInTheDocument();
  });

  it("permite adicionar título e subtítulo", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h1>título</h1>",
        subtitle: "<h2>sub</h2>"
      }
    });
    const titleText = screen.getByText(/título/i);
    expect(titleText).toBeInTheDocument();

    const subtitleText = screen.getByText(/sub/i);
    expect(subtitleText).toBeInTheDocument();
  });
});
