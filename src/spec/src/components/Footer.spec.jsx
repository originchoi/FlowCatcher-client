import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../../components/Footer";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
  it("renders all links correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();

    expect(screen.getByText("About Us")).toHaveAttribute(
      "href",
      "https://github.com/originchoi/FlowCatcher-client",
    );
    expect(screen.getByText("Contact")).toHaveAttribute(
      "href",
      "mailto:kyun4525@gmail.com",
    );
    expect(screen.getByText("Privacy Policy")).toHaveAttribute(
      "href",
      "/policy",
    );
  });

  it("displays the current year", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} FlowCatcher. All rights reserved.`),
    ).toBeInTheDocument();
  });
});
