import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "../../components";
import { routes } from "../../routes";

describe("AppRouter", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
  });

  test("renders correct page for each route", () => {
    routes.forEach(({ path, Component }) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path={path} element={<Component />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByTestId("page-container")).toBeInTheDocument();
    });
  });

  test("renders not found page for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("page-container")).not.toBeInTheDocument();
  });
});
