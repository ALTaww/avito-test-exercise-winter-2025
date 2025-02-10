import React, { useState } from "react";
import { IItems } from "../types/types";

const ListPage = () => {
  const [items, setItems] = useState<IItems[]>([]);

  return <div className="page list-page"></div>;
};

export default ListPage;
