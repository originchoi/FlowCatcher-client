import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import axios from "axios";

import Projects from "../../../components/Dashboard/Projects";

vi.mock("axios");
vi.mock("../../../store/store", () => ({
  useUserStore: vi.fn(() => ({
    user: { _id: "user123" },
  })),
}));

vi.mock("../../../components/Shared/Modal", () => ({
  __esModule: true,
  default: ({ children, isOpen }) => (isOpen ? <div>{children}</div> : null),
}));

vi.mock("../../../components/Shared/DeleteConfirmationModal", () => ({
  __esModule: true,
  default: ({ isOpen, onConfirm }) =>
    isOpen ? <button onClick={onConfirm}>Confirm Delete</button> : null,
}));

describe("Projects Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: "1",
          projectName: "Project 1",

          createdAt: new Date().toISOString(),
        },
      ],
    });
    axios.post.mockResolvedValue({
      data: {
        project: {
          _id: "2",
          projectName: "Project 2",
        },
        scriptCode: "ScriptCode",
      },
    });
    axios.delete.mockResolvedValue({});
  });

  it("renders projects correctly", async () => {
    render(<Projects />);
    await waitFor(() => {
      expect(screen.getByText("Project 1")).toBeInTheDocument();
    });
  });
});
