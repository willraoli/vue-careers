import { usePreviousAndNextPages } from "@/utils/usePreviousAndNextPages";
import type { WritableComputedRef } from "vue";

describe("usePreviousAndNextPages", () => {
  it("calcula a página anterior à atual", () => {
    const currentPage = { value: 2 } as WritableComputedRef<number>;
    const maxPage = { value: 10 } as WritableComputedRef<number>;
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);

    expect(previousPage.value).toBe(1);
  });

  it("calcula a próxima página", () => {
    const currentPage = { value: 2 } as WritableComputedRef<number>;
    const maxPage = { value: 10 } as WritableComputedRef<number>;
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);

    expect(nextPage.value).toBe(3);
  });

  describe("quando está na primeira página", () => {
    it("retorna undefined para a página anterior", () => {
      const currentPage = { value: 1 } as WritableComputedRef<number>;
      const maxPage = { value: 10 } as WritableComputedRef<number>;
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);

      expect(previousPage.value).toBe(undefined);
    });
  });

  describe("quando está na última página", () => {
    it("retorna undefined para a próxima página", () => {
      const currentPage = { value: 10 } as WritableComputedRef<number>;
      const maxPage = { value: 10 } as WritableComputedRef<number>;
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);

      expect(nextPage.value).toBe(undefined);
    });
  });
});
