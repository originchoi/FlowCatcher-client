import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

describe("DeleteConfirmationModal Component", () => {
  it("does not render when not open", () => {
    render(
      <DeleteConfirmationModal
        isOpen={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    const modalText = screen.queryByText(/정말로 프로젝트를 삭제하시겠습니까?/);

    expect(modalText).toBeNull();
  });

  it("renders correctly when open", () => {
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    const modalText = screen.getByText(/정말로 프로젝트를 삭제하시겠습니까?/);

    expect(modalText).toBeInTheDocument();
  });

  it("calls onConfirm when the '삭제' button is clicked", () => {
    const onConfirmMock = vi.fn();
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={onConfirmMock}
      />,
    );

    const deleteButton = screen.getByText("삭제");

    fireEvent.click(deleteButton);

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it("calls onClose when the '취소' button is clicked", () => {
    const onCloseMock = vi.fn();

    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={vi.fn()}
      />,
    );

    const cancelButton = screen.getByText("취소");

    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
