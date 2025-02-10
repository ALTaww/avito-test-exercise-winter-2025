import React, { useEffect, useRef, useState } from "react";
import { IItems } from "../types/types";
import {
  createNewAbortController,
  fetchWithAbort,
  handleError,
} from "../utils";
import Loader from "../templates/Loader";
import { ItemCard } from "../components";
import { itemsApi } from "../api";

const ListPage = () => {
  const [items, setItems] = useState<IItems[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const abortControllerRef = useRef<AbortController>(null);

  useEffect(() => {
    (() => {
      fetchItems();
    })();
  }, []);

  async function fetchItems() {
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
  }

  return (
    <div className="page list-page">
      <h1>Items List</h1>
      {isLoading ? (
        <Loader />
      ) : items.length > 0 ? (
        items.map((item) => <ItemCard key={item.id} item={item} />)
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default ListPage;
