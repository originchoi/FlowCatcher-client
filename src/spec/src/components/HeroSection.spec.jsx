import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import HeroSection from "../../../components/Home/HeroSection";

describe("HeroSection Component", () => {
  const handleScrollToContent = vi.fn();
  const contentRef = { current: document.createElement("div") };

  it("renders the video and sets playsinline attribute", () => {
    render(
      <HeroSection
        contentRef={contentRef}
        handleScrollToContent={handleScrollToContent}
      />,
    );

    const video = document.querySelector("video");

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("playsinline", "true");
  });

  it("renders the correct text content", () => {
    render(
      <HeroSection
        contentRef={contentRef}
        handleScrollToContent={handleScrollToContent}
      />,
    );

    expect(screen.getByText("FlowCatcher")).toBeInTheDocument();
    expect(
      screen.getByText("사용자 행동에 대한 귀중한 데이터를 확보해 보세요"),
    ).toBeInTheDocument();
    expect(screen.getByText("Scroll")).toBeInTheDocument();
  });

  it("calls handleScrollToContent when the button is clicked", () => {
    render(
      <HeroSection
        contentRef={contentRef}
        handleScrollToContent={handleScrollToContent}
      />,
    );

    const button = screen.getByLabelText("Scroll down");

    fireEvent.click(button);

    expect(handleScrollToContent).toHaveBeenCalledWith(contentRef);
  });
});
