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
});
