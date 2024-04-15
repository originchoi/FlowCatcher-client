import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Modal from "../../../components/Modal";

describe("Modal Component", () => {
  it("renders the modal when 'isOpen' is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("does not render the modal when 'isOpen' is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("calls onClose handler when close button is clicked", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByText("Close"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
