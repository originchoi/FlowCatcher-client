import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../../../components/Dashboard/NavBar";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    NavLink: vi.fn(({ children, to, className }) => (
      <div
        data-testid={`NavLink-${to}`}
        className={className({ isActive: to === "/dashboard/overview" })}
      >
        {children}
      </div>
    )),
  };
});

describe("Navbar Component", () => {
  it("renders correctly with active and inactive links", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/overview"]}>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      screen.getByTestId("NavLink-/dashboard/projects").className,
    ).not.toContain("bg-indigo-600");
    expect(
      screen.getByTestId("NavLink-/dashboard/projects").className,
    ).not.toContain("text-white");
    expect(
      screen.getByTestId("NavLink-/dashboard/analytics/behavior").className,
    ).not.toContain("bg-indigo-600");
    expect(
      screen.getByTestId("NavLink-/dashboard/analytics/behavior").className,
    ).not.toContain("text-white");
    expect(
      screen.getByTestId("NavLink-/dashboard/analytics/conversion").className,
    ).not.toContain("bg-indigo-600");
    expect(
      screen.getByTestId("NavLink-/dashboard/analytics/conversion").className,
    ).not.toContain("text-white");
  });
});
