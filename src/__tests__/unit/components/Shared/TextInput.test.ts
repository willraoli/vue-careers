import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  it("informa que o usuário inseriu um caractere", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: ""
      }
    });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Abc");
    const msg = emitted()["update:model-value"];
    expect(msg).toEqual([["A"], ["Ab"], ["Abc"]]);
  });
});
