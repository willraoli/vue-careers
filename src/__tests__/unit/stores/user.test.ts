import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("verifica se o usuário está logado", () => {
    const store = useUserStore();

    expect(store.isLoggedIn).toBe(false);
  });

  it("retorna empresas que o usuário selecionou", () => {
    const store = useUserStore();

    expect(store.selectedOrgs).toEqual([]);
  });

  it("retorna os tipos de vaga que o usuário selecionou", () => {
    const store = useUserStore();

    expect(store.selectedJobTypes).toEqual([]);
  });

  it("retorna os títulos que o usuário selecionou para filtrar as vagas", () => {
    const store = useUserStore();

    expect(store.selectedDegrees).toEqual([]);
  });

  it("armazena o termo de busca para habilidades e qualificações", () => {
    const store = useUserStore();

    expect(store.skillsSearchTerm).toBe("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("faz login", () => {
    const store = useUserStore();
    store.loginUser();

    expect(store.isLoggedIn).toBe(true);
  });

  it("adiciona uma empresa às selectedOrgs", () => {
    const store = useUserStore();
    store.addSelectedOrgs(["Google"]);

    expect(store.selectedOrgs).toEqual(["Google"]);
  });

  it("adiciona um tipo de vaga aos selectedJobTypes", () => {
    const store = useUserStore();
    store.addSelectedJobTypes(["JobType"]);

    expect(store.selectedJobTypes).toEqual(["JobType"]);
  });

  it("adiciona um título aos selectedDegrees", () => {
    const store = useUserStore();
    store.addSelectedDegrees(["degree1"]);

    expect(store.selectedDegrees).toEqual(["degree1"]);
  });

  it("atualiza o termo de busca que o usuário utilizou ao skillsSearchTerm", () => {
    const store = useUserStore();
    store.updateSkillsSearchTerm("skill");

    expect(store.skillsSearchTerm).toBe("skill");
  });

  it("remove todas empresas, tipos de vaga, níveis de formação e termos de busca", () => {
    const store = useUserStore();
    store.addSelectedDegrees(["degree1"]);
    store.addSelectedJobTypes(["job1"]);
    store.addSelectedOrgs(["org1"]);
    store.skillsSearchTerm = "skill1";
    store.clearFilters();

    expect(store.selectedDegrees).toEqual([]);
    expect(store.selectedJobTypes).toEqual([]);
    expect(store.selectedOrgs).toEqual([]);
    expect(store.skillsSearchTerm).toBe("");
  });
});
