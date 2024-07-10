import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MainPage from "../../../components/MainPage";
import { useHeaderStateStore } from "../../../store/store";

vi.mock("../../../components/Header", () => ({
  __esModule: true,
  default: () => <header>Header Mock</header>,
}));

vi.mock("../../../components/Footer", () => ({
  __esModule: true,
  default: () => <footer>Footer Mock</footer>,
}));

vi.mock("../../../store/store", () => ({
  useHeaderStateStore: vi.fn(() => ({
    setHeaderState: vi.fn(),
  })),
}));

describe("MainPage Component", () => {
  const setHeaderState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useHeaderStateStore).mockReturnValue({
      setHeaderState,
    });
  });

  it("renders header, footer, and main content correctly", () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Header Mock")).toBeInTheDocument();
    expect(screen.getByText("Footer Mock")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Get Started" }),
    ).toBeInTheDocument();
    expect(screen.getByText("User Flow Anaysis")).toBeInTheDocument();
    expect(screen.getByText("Conversion Rate Analysis")).toBeInTheDocument();
  });

  it("calls setHeaderState correctly", () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(setHeaderState).toHaveBeenCalledTimes(1);
    expect(setHeaderState).toHaveBeenCalledWith("MainPage");
  });
});
