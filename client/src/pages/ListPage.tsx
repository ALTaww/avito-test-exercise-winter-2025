import React, { useEffect, useRef, useState } from "react";
import { IItems } from "../types/types";
import {
  createNewAbortController,
  fetchWithAbort,
  handleError,
} from "../utils";
import Loader from "../templates/Loader";
import { Btn, ItemCard } from "../components";
import { itemsApi } from "../api";
import { Link } from "react-router-dom";
import { paths } from "../paths";
import { ComponentContainer } from "../templates";
import "../css/list-page.css";

const ListPage = () => {
  const [items, setItems] = useState<IItems[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const abortControllerRef = useRef<AbortController>(null);

  useEffect(() => {
    (() => {
      fetchItems();
    })();
  }, []);

  async function fetchItems() {
    if (isFetched) return;
    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      const data = await fetchWithAbort(
        (signal) => itemsApi.getAllItems(signal),
        signal
      );
      setItems(data);
    } catch (error) {
      const err = handleError(error);
      console.error(err);
    }
    setIsLoading(false);
    setIsFetched(true);
  }

  return (
    <div className="page list-page">
      <ComponentContainer>
        <h1>Список объявлений</h1>
        <div className="place-adv">
          <Link to={paths.Form}>
            <Btn variant="contained" color="success">
              Разместить объявление
            </Btn>
          </Link>
        </div>
        <div className="item-card-list">
          {isLoading ? (
            <Loader />
          ) : items.length > 0 ? (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <p>No items found</p>
          )}
        </div>
      </ComponentContainer>
    </div>
  );
};

export default ListPage;
