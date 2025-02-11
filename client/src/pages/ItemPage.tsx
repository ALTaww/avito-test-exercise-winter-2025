import React, { useEffect, useRef, useState } from "react";
import { ComponentContainer } from "../templates";
import { IItems } from "../types/types";
import { useParams } from "react-router-dom";
import {
  createNewAbortController,
  fetchWithAbort,
  handleError,
} from "../utils";
import { itemsApi } from "../api";
import placeholderImage from "../assets/images/placeholder-image.webp";
import { Btn } from "../components";
import Loader from "../templates/Loader";
import "../css/item-page.css";
import { paths } from "../paths";
import { useSnackbar } from "notistack";

const ItemPage = () => {
  const [itemData, setItemData] = useState<IItems | null>(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
              <h2 className="item-info-name">{itemData.name}</h2>
              <p className="item-info-description">{itemData.description}</p>
              <p className="item-info-type">{itemData.type}</p>
              <p className="item-info-location">{itemData.location}</p>
              <div className="item-info-button">
                <Btn color="primary">Редактировать</Btn>
              </div>
            </div>
            <div className="item-info-link">
              <Btn
                variant="text"
                onClick={async () =>
                  await copyTextToClipboard(window.location.toString())
                }
              >
                Копировать ссылку
              </Btn>
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </ComponentContainer>
    </div>
  );
};

export default ItemPage;
