import { render, screen } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/JobSearch/SpotLight.vue";
import type { Mock } from "vitest";

vi.mock("axios");

describe("SpotLight", () => {
  beforeEach(() => {
    (axios.get as Mock).mockResolvedValue({
      data: [
        {
          img: "an image",
          title: "a title",
          description: "a description"
        }
      ]
    });
  });
  it("envia a img para o componente-pai", async () => {
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`
      }
    });

    const imgText = await screen.findByText(/an image/i);
    expect(imgText).toBeInTheDocument();
  });

  it("envia o título para o componente-pai", async () => {
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`
      }
    });

    const titleText = await screen.findByText(/a title/i);
    expect(titleText).toBeInTheDocument();
  });

  it("envia a descrição para o componente-pai", async () => {
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>`
      }
    });

    const descriptionText = await screen.findByText(/a description/i);
    expect(descriptionText).toBeInTheDocument();
  });
});
