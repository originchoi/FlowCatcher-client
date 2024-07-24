import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import Header from "../../../components/Header";
import { useUserStore, useHeaderStateStore } from "../../../store/store";

vi.mock("../../../store/store", () => ({
  useUserStore: vi.fn(() => ({
    user: null,
    setUser: vi.fn(),
    isLoggedIn: false,
    setIsLoggedIn: vi.fn(),
  })),
  useHeaderStateStore: vi.fn(() => ({
    headerState: "Home",
  })),
}));

vi.mock("axios", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    get: vi.fn(() =>
      Promise.resolve({
        data: { result: true, user: { id: "user1", name: "John Doe" } },
      }),
    ),
    post: vi.fn(),
    delete: vi.fn(),
  };
});

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
});

describe("Header Component", () => {
  const mockSetUser = vi.fn();
  const mockSetIsLoggedIn = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    useUserStore.mockReturnValue({
      user: null,
      setUser: mockSetUser,
      isLoggedIn: false,
      setIsLoggedIn: mockSetIsLoggedIn,
    });
    useHeaderStateStore.mockReturnValue({ headerState: "Home" });
    signInWithPopup.mockResolvedValue({
      user: { id: "user1", name: "John Doe", photoURL: "url" },
    });
    signOut.mockResolvedValue();
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("FlowCatcher")).toBeInTheDocument();
  });
});
