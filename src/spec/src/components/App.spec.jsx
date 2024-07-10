import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import App from "../../../components/App";

vi.mock("../../../components/Home/MainPage", () => ({
  __esModule: true,
  default: () => <div>MainPage Mock</div>,
}));

vi.mock("../../../components/Dashboard/Dashboard", () => ({
  __esModule: true,
  default: () => <div>Dashboard Mock</div>,
}));

vi.mock("../../../components/shared/ErrorPage", () => ({
  __esModule: true,
  default: () => <div>ErrorPage Mock</div>,
}));

describe("App Component Routing", () => {
  it("should render MainPage for root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("MainPage Mock")).toBeInTheDocument();
  });

  it("should navigate to Overview by default when visiting /dashboard", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard Mock")).toBeInTheDocument();
  });

  it("should render the ErrorPage for non-existent routes", () => {
    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("ErrorPage Mock")).toBeInTheDocument();
  });
});
