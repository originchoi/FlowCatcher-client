import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TextSection from "../../../components/Home/TextSection";

describe("TextSection Component", () => {
  it("renders the correct text content", () => {
    render(<TextSection />);

    const textContent1 =
      "모든 사용자 행동 데이터를 한눈에 확인하고 한 곳에서 관리하세요.";
    const textContent2 =
      "이제껏 경험하지 못한 쉽고 편리한 사용자 행동 분석 서비스,";
    const textContent3 =
      "FlowCatcher와 함께라면 당신의 사용자 데이터 관리가 새로워질 거예요.";

    expect(
      screen.getByText(
        /모든 사용자 행동 데이터를 한눈에 확인하고 한 곳에서 관리하세요./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /이제껏 경험하지 못한 쉽고 편리한 사용자 행동 분석 서비스,/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /FlowCatcher와 함께라면 당신의 사용자 데이터 관리가 새로워질 거예요./,
      ),
    ).toBeInTheDocument();
  });
});
