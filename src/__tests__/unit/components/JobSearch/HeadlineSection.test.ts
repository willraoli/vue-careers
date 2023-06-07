import { render, screen } from "@testing-library/vue";
import HeadlineSection from "@/components/JobSearch/HeadlineSection.vue";
import { nextTick } from "vue";

describe("HeadlineSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("mostra o primeiro texto do h1", () => {
    render(HeadlineSection);

    const headingText = screen.getByRole("heading", { name: /vagas para todos/i });
    expect(headingText).toBeInTheDocument();
  });

  it("muda o texto do h1 em intervalos consistentes", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    render(HeadlineSection);

    expect(mock).toHaveBeenCalled();
  });

  it("muda o texto do h1 após intervalo", async () => {
    render(HeadlineSection);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const text = screen.getByRole("heading", { name: /empregos para todos/i });

    expect(text).toBeInTheDocument();
  });

  it("remove o intervalo quando o componente some", () => {
    const clearInterval = vi.spyOn(window, "clearInterval");

    render(HeadlineSection).unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
