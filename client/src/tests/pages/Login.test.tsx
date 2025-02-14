import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../pages/Login";
import { userStore } from "../../store";
import { SnackbarProvider } from "notistack";
import { cookie } from "../../utils";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

jest.mock("../../utils/cookie", () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

jest.mock("../../store", () => ({
  userStore: {
    isAuth: false,
    setIsAuth: jest.fn(),
  },
}));

describe("Login Component", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SnackbarProvider>
          <Login />
        </SnackbarProvider>
      </MemoryRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Отображает форму логина, если пользователь не авторизован", () => {
    renderComponent();

    expect(screen.getByText("Войдите в профиль")).toBeInTheDocument();
    expect(screen.getByLabelText("Никнейм")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Войти" })).toBeInTheDocument();
  });

  test("Показывает ошибки при пустых полях", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Войти" }));

    expect(screen.getByText("Некорректный никнейм")).toBeInTheDocument();
    expect(screen.getByText("Некорректный пароль")).toBeInTheDocument();
  });

  test("Логин успешный, устанавливается кука и вызывается userStore.setIsAuth", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Никнейм"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Войти" }));

    expect(cookie.setCookie).toHaveBeenCalledWith("username", "testUser");
    expect(userStore.setIsAuth).toHaveBeenCalledWith(true);
  });

  test("Выход из аккаунта удаляет куку и сбрасывает авторизацию", () => {
    userStore.isAuth = true;
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Выйти" }));

    expect(cookie.deleteCookie).toHaveBeenCalledWith("username");
    expect(userStore.setIsAuth).toHaveBeenCalledWith(false);
  });

  test("Отображает сообщение после успешного входа", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Никнейм"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Войти" }));

    expect(await screen.findByText("Вы вошли в профиль")).toBeInTheDocument();
  });
});
