import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../paths";
import { ComponentContainer } from "../templates";
import "../css/header.css";
import { userStore } from "../store";
import { observer } from "mobx-react";

const Header = () => {
  return (
    <header>
      <ComponentContainer>
        <div className="header">
          <Link to={paths.Form}>Страница формы</Link>
          <Link to={paths.Item + "1"}>Страница объявления</Link>
          <Link to={paths.List}>Все объявления</Link>
          <Link to={paths.Login}>Войти в профиль</Link>
          {userStore.isAuth ? <span>{userStore.data?.username}</span> : null}
        </div>
      </ComponentContainer>
    </header>
  );
};

export default observer(Header);
