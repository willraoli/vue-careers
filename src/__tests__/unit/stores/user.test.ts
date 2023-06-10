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
});
