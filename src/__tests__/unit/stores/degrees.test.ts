import { createPinia, setActivePinia } from "pinia";
import { useDegreesStore } from "@/stores/degrees";
import { createDegree } from "@/api/createDegree";
import axios from "axios";
import type { Mock } from "vitest";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("armazena os todos os títulos requeridos para cada vaga", () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("fetchDegrees", () => {
    it("faz a request para a API e armazena os títulos", async () => {
      axiosGetMock.mockResolvedValue({ data: [{ id: 1, degree: "Bachelor's" }] });

      const store = useDegreesStore();

      await store.fetchDegrees();
      expect(store.degrees).toEqual([{ id: 1, degree: "Bachelor's" }]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("uniqueDegrees", () => {
    it("retorna um set com títulos únicos", () => {
      const store = useDegreesStore();

      store.degrees = [createDegree({ degree: "degree1" }), createDegree({ degree: "degree2" })];

      const result = store.uniqueDegrees;

      expect(result).toEqual(["degree1", "degree2"]);
    });
  });
});
