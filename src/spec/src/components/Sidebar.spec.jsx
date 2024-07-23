import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "../../../components/Dashboard/Sidebar";

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

describe("Sidebar Component", () => {
  it("renders correctly with active and inactive links", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/overview"]}>
        <Sidebar />
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
