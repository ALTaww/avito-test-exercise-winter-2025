import React, { useState } from "react";
import { ComponentContainer } from "../templates";
import { TextField } from "@mui/material";
import { userStore } from "../store";
import { Btn } from "../components";
import { IFieldErrors } from "../types/simpleTypes";
import { cookie } from "../utils";
import { useSnackbar } from "notistack";
import { observer } from "mobx-react";

const Login = () => {
  const [errors, setErrors] = useState<IFieldErrors>({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function logout() {
    cookie.deleteCookie("username");
    userStore.setIsAuth(false);
  }

  function login(e: React.FormEvent<HTMLFormElement>) {
    //e.preventDefault();
    if (!username || !password) {
      enqueueSnackbar("Заполните никнейм и пароль");
      const newErrors: IFieldErrors = {};
      newErrors.username = !username ? "Некорректный никнейм" : "";
      newErrors.password = !password ? "Некорректный пароль" : "";
      setErrors(newErrors);
      return;
    }

    cookie.setCookie("username", username);
    userStore.setIsAuth(true);
  }

  return (
    <div className="page login-page">
      <ComponentContainer>
        {!userStore.isAuth && (
          <div className="auth">
            <h1>Войдите в профиль</h1>
            <div>
              <form onSubmit={(e) => login(e)} method="POST">
                <TextField
                  sx={{ mb: 2 }}
                  type="text"
                  name="username"
                  label="Никнейм"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username && "Некорректный никнейм"}
                />
                <br />
                <TextField
                  sx={{ mb: 2 }}
                  type="password"
                  name="password"
                  label="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password && "Некорректный пароль"}
                />
                <br />
                <Btn type="submit">Войти</Btn>
              </form>
            </div>
            <div>
              <p className="note">Вводите что угодно, никакой валидации нет</p>
            </div>
          </div>
        )}
        {userStore.isAuth && (
          <div className="logout">
            <h1>Вы вошли в профиль</h1>
            <Btn onClick={logout}>Выйти</Btn>
          </div>
        )}
      </ComponentContainer>
    </div>
  );
};

export default observer(Login);
