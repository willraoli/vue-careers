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
        { organization: "Google", jobType: "", degree: "" },
        { organization: "Amazon", jobType: "", degree: "" },
        { organization: "Google", jobType: "", degree: "" }
      ];
      const result = store[UNIQUE_ORGS];

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("uniqueJobTypes", () => {
    it("retorna tipos de vagas únicos a partir de uma lista de vagas", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google", jobType: "Remote", degree: "" },
        { organization: "Amazon", jobType: "Remote", degree: "" },
        { organization: "Google", jobType: "9-5", degree: "" }
      ];

      const res = store.uniqueJobTypes;

      expect(res).toEqual(new Set(["Remote", "9-5"]));
    });
  });

  describe("includeJobByOrg", () => {
    describe("quando o usuário não tem uma empresa selecionada", () => {
      it("inclui todas as vagas", () => {
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const job = { organization: "Google", jobType: "", degree: "" };

        userStore.selectedOrgs = [];

        const result = jobsStore.includeJobByOrg(job);

        expect(result).toBe(true);
      });

      it("inclui somente as vagas das empresas selecionadas", () => {
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const job = { organization: "Google", jobType: "", degree: "" };

        userStore.selectedOrgs = ["Google", "Microsoft"];

        const result = jobsStore.includeJobByOrg(job);

        expect(result).toBe(true);
      });
    });
  });

  describe("includeJobByJobType", () => {
    describe("quando o usuário não tem um tipo de vaga selecionado", () => {
      it("inclui todas as vagas", () => {
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const job = { organization: "", jobType: "jobtype", degree: "" };

        userStore.selectedJobTypes = [];

        const result = jobsStore.includeJobByJobType(job);

        expect(result).toBe(true);
      });
    });

    it("inclui somente as vagas dos tipos selecionados", () => {
      const userStore = useUserStore();
      const jobsStore = useJobsStore();
      const job = { organization: "", jobType: "Full-time", degree: "" };

      userStore.selectedJobTypes = ["Full-time"];

      const result = jobsStore.includeJobByJobType(job);

      expect(result).toBe(true);
    });
  });

  describe("includeJobByDegree", () => {
    describe("quando o usuário não tem nenhum título selecionado", () => {
      it("inclui todas vagas", () => {
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const job = { organization: "", jobType: "", degree: "degree1" };

        userStore.selectedDegrees = [];

        const result = jobsStore.includeJobByDegree(job);

        expect(result).toBe(true);
      });
    });
    it("inclui somente as vagas do tipo selecionado", () => {
      const userStore = useUserStore();
      const jobsStore = useJobsStore();
      const job = { organization: "", jobType: "", degree: "degree1" };

      userStore.selectedDegrees = ["degree1"];

      const result = jobsStore.includeJobByDegree(job);

      expect(result).toBe(true);
    });
  });
});
