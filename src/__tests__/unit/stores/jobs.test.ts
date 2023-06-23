import { createPinia, setActivePinia } from "pinia";
import { UNIQUE_ORGS, useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
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

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGS", () => {
    it("retorna empresas únicas a partir de uma lista de vagas", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" }
      ];
      const result = store[UNIQUE_ORGS];

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("filteredJobsByOrg", () => {
    it("identifica vagas associadas com as empresas selecionadas", () => {
      const jobsStore = useJobsStore();
      const userStore = useUserStore();

      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" }
      ];
      userStore.selectedOrgs = ["Google", "Amazon"];

      const result = jobsStore.filteredJobsByOrg;
      expect(result).toEqual([{ organization: "Google" }, { organization: "Amazon" }]);
    });

    describe("quando o usuário não seleciona nenhuma empresa", () => {
      it("retorna todas as empresas", () => {
        const jobsStore = useJobsStore();
        const userStore = useUserStore();

        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" }
        ];
        userStore.selectedOrgs = [];

        const result = jobsStore.filteredJobsByOrg;
        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" }
        ]);
      });
    });
  });
});
