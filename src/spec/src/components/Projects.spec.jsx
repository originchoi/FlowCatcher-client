import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import axios from "axios";

import Projects from "../../../components/Dashboard/Projects";
import { convertFormatApiKey } from "../../../utils/convertFormUtils";

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
          apiKey: "API123456789SECRET",
          createdAt: new Date().toISOString(),
        },
      ],
    });
    axios.post.mockResolvedValue({
      data: {
        project: {
          _id: "2",
          projectName: "Project 2",
          apiKey: "API234567890SECRET",
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

      const transformedApiKey = convertFormatApiKey("API123456789SECRET");

      expect(screen.getByText(transformedApiKey)).toBeInTheDocument();
    });
  });
});
