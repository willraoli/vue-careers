import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  type Job = { title: string; organization: string };

  const createProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "VueTube",
    ...jobProps
  });

  const renderJobListing = (jobProps: Job) => {
    render(JobListing, {
      props: {
        job: jobProps
      },
      global: {
        stubs: {
          "router-link": RouterLinkStub
        }
      }
    });
  };

  it("exibe o nome da vaga", () => {
    renderJobListing(createProps());
    expect(screen.getByText(/vue developer/i)).toBeInTheDocument();
  });

  it("exibe o nome da empresa", () => {
    renderJobListing(createProps());
    expect(screen.getByText(/vuetube/i)).toBeInTheDocument();
  });

  it("exibe o local da empresa", () => {
    renderJobListing(createProps({ locations: ["Brasil", "Argentina"] }));
    expect(screen.getByText(/brasil/i)).toBeInTheDocument();
    expect(screen.getByText(/argentina/i)).toBeInTheDocument();
  });

  it("exibe os requisitos da empresa", () => {
    renderJobListing(createProps({ minimumQualifications: ["ABC", "DEF"] }));
    expect(screen.getByText(/abc/i)).toBeInTheDocument();
    expect(screen.getByText(/def/i)).toBeInTheDocument();
  });
});
