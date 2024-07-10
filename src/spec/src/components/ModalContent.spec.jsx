import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ModalContent from "../../../components/Home/ModalContent";

describe("ModalContent Component", () => {
  const selectedCard = {
    title: "Test Card",
    gifs: [
      "/assets/servicecode_issued.gif",
      "/assets/servicecode_apply.gif",
      "/assets/behavior_analytics.gif",
    ],
    customMessage: "This is a custom message.",
  };

  it("renders the correct title", () => {
    render(<ModalContent selectedCard={selectedCard} />);

    expect(screen.getByText("How to use Test Card")).toBeInTheDocument();
  });

  it("renders the steps and list items correctly", () => {
    render(<ModalContent selectedCard={selectedCard} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();

    const listItem1 = screen.getByText(
      /본인의 웹사이트에 사용할 서비스 코드를 발급받기 위해 사용자는 프로젝트를 만들 수 있습니다./,
    );
    const listItem2 = screen.getByText(
      /프로젝트별로 서비스 코드를 발급 받을 수 있고, copy 버튼으로 복사할 수 있습니다./,
    );
    const listItem3 = screen.getByText(
      /발급받은 서비스 코드\(스크립트 코드\)를 사용자의 비즈니스 웹사이트에 붙여넣기 하여 사용합니다./,
    );
    const listItem4 = screen.getByText(
      /행동 흐름 분석 탭에서 서비스 코드를 적용한 웹 사이트 내 방문자들의 페이지 이동 흐름을 볼 수 있습니다./,
    );
    const listItem5 = screen.getByText(
      /가장 많이 방문한 페이지 5개가 메인페이지 주소 이하 url로 나열되어 그래프와 함께 나타냅니다./,
    );
    const listItem6 = screen.getByText(
      /가장 하단에 방문자들의 페이지 흐름을 시각화 하여 나타냅니다./,
    );

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();
    expect(listItem4).toBeInTheDocument();
    expect(listItem5).toBeInTheDocument();
    expect(listItem6).toBeInTheDocument();
  });

  it("renders the custom message correctly", () => {
    render(<ModalContent selectedCard={selectedCard} />);

    expect(screen.getByText("This is a custom message.")).toBeInTheDocument();
  });
});
