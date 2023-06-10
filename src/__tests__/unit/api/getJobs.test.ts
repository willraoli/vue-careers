import axios from "axios";
import getJobs from "@/api/getJobs";
import type { Mock } from "vitest";

vi.mock("axios");

describe("getJobs", () => {
  beforeEach(() => {
    (axios.get as Mock).mockResolvedValue({
      data: [
        { id: 1, title: "Java Engineer" },
        { id: 2, title: "Frontend Dev" }
      ]
    });
  });

  it("recebe as vagas disponíveis", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("extrai as vagas da resposta da api", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      { id: 1, title: "Java Engineer" },
      { id: 2, title: "Frontend Dev" }
    ]);
  });
});
