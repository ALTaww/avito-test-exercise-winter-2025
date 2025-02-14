import React, { useEffect, useRef, useState } from "react";
import { IItems, IItemTypes } from "../types/types";
import {
  createNewAbortController,
  fetchWithAbort,
  handleError,
} from "../utils";
import Loader from "../templates/Loader";
import { Btn, ItemCard, PaginationMy } from "../components";
import { itemsApi } from "../api";
import { Link } from "react-router-dom";
import { paths } from "../paths";
import { ComponentContainer } from "../templates";
import "../css/list-page.css";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { ItemTypes } from "../utils/consts";

const itemsPerPage = 5;

const ListPage = () => {
  const [items, setItems] = useState<IItems[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [isFetched, setIsFetched] = useState(false);
  const abortControllerRef = useRef<AbortController>(null);
  const [searchItemsArray, setSearchItemsArray] = useState(items);

  useEffect(() => {
    (() => {
      fetchItems();
    })();
  }, []);

  useEffect(() => {
    setSearchItemsArray(items);
  }, [items]);

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

  function searchItems() {
    setPage(1);
    setSearchItemsArray(
      items.filter((item) => {
        if (!item.name.includes(search)) return false;
        if (category === "Все") return true;
        return item.type === category;
      })
    );
  }

  return (
    <div className="page list-page">
      <ComponentContainer>
        <h1>Список объявлений</h1>
        <div style={{ marginBottom: "2rem" }}>
          <p>
            Страница {page} из{" "}
            {Math.ceil(searchItemsArray.length / itemsPerPage)}
          </p>
        </div>
        <div className="place-adv">
          <Link to={paths.Form}>
            <Btn variant="contained" color="success">
              Разместить объявление
            </Btn>
          </Link>
        </div>
        <div
          className="sorting"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <TextField
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ m: "0 1rem 2rem 0", minWidth: 180 }}
              label="Искать по названию"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchItems();
                }
              }}
            />
            <TextField
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={"Все"}
              label="Категория"
              sx={{ m: "0 1rem 2rem 0" }}
            >
              <MenuItem value={"Все"}>Все</MenuItem>

              {Object.entries(ItemTypes).map((category) => (
                <MenuItem value={category[1]}>{category[1]}</MenuItem>
              ))}
            </TextField>
            <Btn onClick={searchItems}>Искать</Btn>
          </div>
        </div>
        <div className="item-card-list">
          {isLoading ? (
            <Loader />
          ) : searchItemsArray.length > 0 ? (
            searchItemsArray
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <p>No items found</p>
          )}
        </div>
        <PaginationMy
          itemsCount={searchItemsArray.length}
          itemsPerPage={itemsPerPage}
          page={page}
          onChange={(e, page) => setPage(page)}
        />
      </ComponentContainer>
    </div>
  );
};

export default ListPage;
