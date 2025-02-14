import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "../../../components/index";
import { fieldTypes, fieldButtonTypes } from "../../../types/simpleTypes";

const mockHandleChange = jest.fn();
const mockHandleBlur = jest.fn();
const mockHandleClick = jest.fn();

describe("Form Component", () => {
  const fields = [
    {
      name: "username",
      label: "Username",
      type: fieldTypes.text,
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: fieldTypes.password,
      required: true,
    },
    { name: "bio", label: "Bio", type: fieldTypes.textarea, required: false },
    {
      name: "role",
      label: "Role",
      type: fieldTypes.select,
      required: true,
      selectOptions: ["Admin", "User"],
    },
  ];

  const errors = { username: "Username is required" };
  const values = { username: "", password: "", bio: "", role: "" };

  it("renders form fields correctly", () => {
    render(
      <Form
        errors={{}}
        fields={fields}
        values={values}
        handleChange={mockHandleChange}
        handleBlur={mockHandleBlur}
      />
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
  });

  it("calls handleChange on input change", () => {
    render(
      <Form
        errors={{}}
        fields={fields}
        values={values}
        handleChange={mockHandleChange}
        handleBlur={mockHandleBlur}
      />
    );

    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "JohnDoe" } });
    expect(mockHandleChange).toHaveBeenCalledWith("username", "JohnDoe");
  });

  it("calls handleBlur on input blur", () => {
    render(
      <Form
        errors={{}}
        fields={fields}
        values={values}
        handleChange={mockHandleChange}
        handleBlur={mockHandleBlur}
      />
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.blur(passwordInput, { target: { value: "123456" } });
    expect(mockHandleBlur).toHaveBeenCalledWith(
      "password",
      "123456",
      fieldTypes.password
    );
  });

  it("displays error messages when present", () => {
    render(
      <Form
        errors={errors}
        fields={fields}
        values={values}
        handleChange={mockHandleChange}
        handleBlur={mockHandleBlur}
      />
    );

    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });

  it("calls handleClick when button is clicked", () => {
    render(
      <Form
        errors={{}}
        fields={fields}
        values={values}
        handleChange={mockHandleChange}
        handleBlur={mockHandleBlur}
        handleClick={mockHandleClick}
        buttonType={fieldButtonTypes.button}
      />
    );

    const button = screen.getByRole("button", { name: "Далее" });
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalled();
  });
});
