import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../paths";
import { Btn } from "../components";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page not-found-page">
      <h2>Страница не найдена</h2>
      <div>
        <Link to={paths.Home}>На главную</Link>
        <Btn onClick={() => navigate(-1)}>Вернуться назад</Btn>
      </div>
    </div>
  );
};

export default NotFound;
