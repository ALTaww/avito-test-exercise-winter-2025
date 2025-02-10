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

const ItemPage = () => {
  const [itemData, setItemData] = useState<IItems>({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>(null);

  useEffect(() => {
    if (!id || !(parseInt(id) instanceof Number)) {
      setError("Неверный id");
    }
  }, []);

  async function fetchItem() {
    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      const data = await fetchWithAbort(
        (signal) => itemsApi.getItem(id, signal),
        signal
      );
      if (data instanceof String) {
        setError(data);
      } else {
        setItemData(data);
      }
    } catch (error) {
      const err = handleError(error);
      console.error(err);
    }

    setIsLoading(false);
  }

  return (
    <div className="page item-page">
      <ComponentContainer>
        <h1>Страница объявления</h1>
        <div className="item-info"></div>
      </ComponentContainer>
    </div>
  );
};

export default ItemPage;
