import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import MobileAccess from "../../../components/MobileAccess";

describe("MobileAccess Component", () => {
  it("renders correctly", () => {
    render(<MobileAccess />);

    const titleElement = screen.getByText(/Service Unavailable 😭/i);

    expect(titleElement).toBeInTheDocument();

    const messageElement = screen.getByText(
      /The FlowCatcher service is not available on mobile devices./i,
    );

    expect(messageElement).toBeInTheDocument();

    const adviceElement = screen.getByText(
      /Please visit us on a desktop browser. Thank you for your understanding!/i,
    );

    expect(adviceElement).toBeInTheDocument();
  });
});
