import getNextElement from "@/utils/getNextElement";

describe("getNextElement", () => {
  it("localiza o elemento na lista e retorna o próximo elemento da lista", () => {
    const list = ["a", "b", "c", "d"];
    const value = "c";
    const result = getNextElement(list, value);
    expect(result).toBe("d");
  });

  describe("quando o elemento está no final da lista", () => {
    it("localiza o elemento do começo da lista", () => {
      const list = ["a", "b", "c", "d"];
      const value = "d";
      const result = getNextElement(list, value);
      expect(result).toBe("a");
    });
  });
});
