import React, { useEffect, useRef, useState } from "react";
import { ComponentContainer } from "../templates";
import { IItems } from "../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  cookie,
  createNewAbortController,
  fetchWithAbort,
  handleError,
} from "../utils";
import { itemsApi } from "../api";
import placeholderImage from "../assets/images/placeholder-image.webp";
import { Btn } from "../components";
import Loader from "../templates/Loader";
import "../css/item-page.css";
import { useSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { userStore } from "../store";
import { paths } from "../paths";
import { observer } from "mobx-react";
import { ItemTypes } from "../utils/consts";

const ItemPage = () => {
  const [itemData, setItemData] = useState<IItems | null>(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const numId = Number(id);
    if (!id || Number.isNaN(numId)) {
      setError("Неверный id");
      return;
    }
    fetchItem(numId);
  }, [id]);

  async function fetchItem(itemId: number) {
    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      setIsLoading(true);
      const data = await fetchWithAbort(
        (signal) => itemsApi.getItem(itemId, signal),
        signal
      );
      if (typeof data === "string") {
        setError(data);
      } else {
        setItemData(data);
        setError(null);
      }
    } catch (error) {
      const err = handleError(error);
      setError(err.message);
      console.error(err);
    }

    setIsLoading(false);
  }

  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar("Ссылка скопирована");
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };

  function handleChangeData() {
    cookie.setCookie("formData", JSON.stringify(itemData));
    navigate(paths.Form);
  }

  return (
    <div className="page item-page">
      <ComponentContainer>
        <h1>Страница объявления</h1>
        {isLoading && <Loader />}
        {itemData && (
          <div className="item-info">
            <div className="item-info-image image-container">
              {itemData.image ? (
                <img src={itemData.image} alt="" />
              ) : (
                <img src={placeholderImage} alt="" />
              )}
            </div>
            <div className="item-info-main">
              <h2 className="item-info-name">
                {itemData.name}{" "}
                <Btn
                  variant="text"
                  className="item-info-link"
                  onClick={async () =>
                    await copyTextToClipboard(window.location.toString())
                  }
                  aria-label="Копировать ссылку"
                >
                  <ContentCopyIcon className="copy-icon" />
                </Btn>
              </h2>
              <p className="item-info-description">
                Описание: {itemData.description}
              </p>
              <p className="item-info-type">{itemData.type}</p>
              <p className="item-info-location">Локация: {itemData.location}</p>
              {itemData.type === ItemTypes.cars && (
                <div>
                  <p>Бренд: {itemData.brand}</p>
                  <p>Модель: {itemData.model} </p>
                  <p> Год: {itemData.year}</p>
                  <p> Пробег: {itemData.mileage} км</p>
                </div>
              )}
              {itemData.type === ItemTypes.realEstate && (
                <div>
                  <p>Тип: {itemData.propertyType}</p>
                  <p>Площадь: {itemData.area}</p>
                  <p>{itemData.rooms} комнат</p>
                  <p>{itemData.price} руб.</p>
                </div>
              )}
              {itemData.type === ItemTypes.services && (
                <div>
                  <p>Тип: {itemData.serviceType}</p>
                  <p>Опыт: {itemData.experience}</p>
                  <p>Цена: {itemData.cost} руб.</p>
                  <p>График: {itemData.workSchedule}</p>
                </div>
              )}

              <div className="item-info-button">
                {userStore.isAuth ? (
                  <Btn color="primary" onClick={handleChangeData}>
                    Редактировать
                  </Btn>
                ) : (
                  <div>
                    <p>Для редактирования нужно войти в профиль</p>
                    <Link to={paths.Login}>Войти</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </ComponentContainer>
    </div>
  );
};

export default observer(ItemPage);
