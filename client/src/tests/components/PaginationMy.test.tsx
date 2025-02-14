import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationMy } from "../../components";

describe("PaginationMy Component", () => {
  test("renders pagination with correct page count", () => {
    render(<PaginationMy itemsCount={50} itemsPerPage={10} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("disables pagination when disabled prop is true", () => {
    render(<PaginationMy itemsCount={50} itemsPerPage={10} disabled />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  test("calls onChange when a page is clicked", () => {
    const handleChange = jest.fn();
    render(
      <PaginationMy itemsCount={50} itemsPerPage={10} onChange={handleChange} />
    );

    const pageButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(pageButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renders correct active page", () => {
    render(<PaginationMy itemsCount={50} itemsPerPage={10} page={3} />);
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  });
});
