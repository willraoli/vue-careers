import { createPinia, setActivePinia } from "pinia";
import { UNIQUE_ORGS, useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import type { Mock } from "vitest";
import type { Job } from "@/api/types";

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
        { organization: "Google", jobType: "", degree: "", title: "jobtitle" },
        { organization: "Amazon", jobType: "", degree: "", title: "jobtitle" },
        { organization: "Google", jobType: "", degree: "", title: "jobtitle" }
      ];
      const result = store[UNIQUE_ORGS];

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("uniqueJobTypes", () => {
    it("retorna tipos de vagas únicos a partir de uma lista de vagas", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google", jobType: "Remote", degree: "", title: "jobtitle" },
        { organization: "Amazon", jobType: "Remote", degree: "", title: "jobtitle" },
        { organization: "Google", jobType: "9-5", degree: "", title: "jobtitle" }
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
        const job = { organization: "Google", jobType: "", degree: "", title: "jobtitle" };

        userStore.selectedOrgs = [];

        const result = jobsStore.includeJobByOrg(job);

        expect(result).toBe(true);
      });

      it("inclui somente as vagas das empresas selecionadas", () => {
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const job = { organization: "Google", jobType: "", degree: "", title: "jobtitle" };

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
        const job = { organization: "", jobType: "jobtype", degree: "", title: "jobtitle" };

        userStore.selectedJobTypes = [];

        const result = jobsStore.includeJobByJobType(job);

        expect(result).toBe(true);
      });
    });

    it("inclui somente as vagas dos tipos selecionados", () => {
      const userStore = useUserStore();
      const jobsStore = useJobsStore();
      const job = { organization: "", jobType: "Full-time", degree: "", title: "jobtitle" };

      userStore.selectedJobTypes = ["Full-time"];

      const result = jobsStore.includeJobByJobType(job);

      expect(result).toBe(true);
    });
  });

  describe("includeJobBySkill", () => {
    it("identifica se a vaga corresponde à busca do usuário", () => {
      const userStore = useUserStore();
      const jobsStore = useJobsStore();

      const job = { organization: "", jobType: "", degree: "", title: "skill" } as Job;
      userStore.skillsSearchTerm = "skill";
      const result = jobsStore.includeJobBySkill(job);

      expect(result).toBe(true);
    });

    it("lida com caracteres capitalizados", () => {
      const userStore = useUserStore();
      const jobsStore = useJobsStore();

      const job = { organization: "", jobType: "", degree: "", title: "skill" } as Job;
      const result = jobsStore.includeJobBySkill(job);
      userStore.skillsSearchTerm = "SKILL";

      expect(result).toBe(true);
    });
  });

  describe("includeJobByDegree", () => {
    describe("quando o usuário não tem nenhum título selecionado", () => {
      it("inclui todas vagas", () => {
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const job = { organization: "", jobType: "", degree: "degree1", title: "jobtitle" };

        userStore.selectedDegrees = [];

        const result = jobsStore.includeJobByDegree(job);

        expect(result).toBe(true);
      });
    });
    it("inclui somente as vagas do tipo selecionado", () => {
      const userStore = useUserStore();
      const jobsStore = useJobsStore();
      const job = { organization: "", jobType: "", degree: "degree1", title: "jobtitle" };

      userStore.selectedDegrees = ["degree1"];

      const result = jobsStore.includeJobByDegree(job);

      expect(result).toBe(true);
    });
  });
});
