import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import axios from "axios";
import type { Mock } from "vitest";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("armazena vagas", () => {
    const store = useJobsStore();

    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("faz a request na API e armazena as vagas recebidas", async () => {
      (axios.get as Mock).mockResolvedValue({ data: ["Vaga 1", "Vaga 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();

      expect(store.jobs).toEqual(["Vaga 1", "Vaga 2"]);
    });
  });
});
