import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import ErrorPage from "../../../components/ErrorPage";
import MainPage from "../../../components/MainPage";

describe("Error Page", () => {
  it("render Error Page", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Return to the main page")).toBeInTheDocument();
  });

  it("Should include a link to the main page", () => {
    const testErrorMessage = "Something went wrong";

    render(
      <MemoryRouter>
        <ErrorPage errorMessage={testErrorMessage} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText("Return to the main page");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/");
  });

  it("Should navigate to the main page when the link is clicked", () => {
    const testErrorMessage = "Unauthorized access";

    render(
      <MemoryRouter initialEntries={["/error"]}>
        <Routes>
          <Route
            path="*"
            element={<ErrorPage errorMessage={testErrorMessage} />}
          />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Return to the main page"));

    expect(
      screen.getByText("사용자 행동에 대한 귀중한 데이터를 확보해보세요"),
    ).toBeInTheDocument();
  });
});
