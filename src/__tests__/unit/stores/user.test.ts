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

  it("adiciona uma empresa à selectedOrgs", () => {
    const store = useUserStore();
    store.addSelectedOrgs(["Google"]);

    expect(store.selectedOrgs).toEqual(["Google"]);
  });
});
