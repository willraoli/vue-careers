import getDegrees from "@/api/getDegrees";
import axios from "axios";
import type { Mock } from "vitest";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        { id: 1, degree: "Master's" },
        { id: 2, degree: "Bachelor's" }
      ]
    });
  });

  it("recebe os níveis", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });

  it("extrai os níveis da resposta da api", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([
      { id: 1, degree: "Master's" },
      { id: 2, degree: "Bachelor's" }
    ]);
  });
});
