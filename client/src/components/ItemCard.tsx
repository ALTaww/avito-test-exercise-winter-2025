import React, { FC } from "react";
import { IItems } from "../types/types";
import placeholderImage from "../assets/images/placeholder-image.webp";
import { Link } from "react-router-dom";
import { paths } from "../paths";

interface IComponent extends React.HTMLAttributes<HTMLDivElement> {
  item: IItems;
  props?: unknown;
}

const Item: FC<IComponent> = ({ item, ...props }) => {
  return (
    <div className="item-card">
      <div
        className={`item-card-image${
          props.className ? " " + props.className : ""
        }`}
      >
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <img src={placeholderImage} alt={item.name} />
        )}
      </div>
      <div className="item-card-info">
        <h3>{item.name}</h3>
        <p>{item.type}</p>
        <p>{item.location}</p>
      </div>
      <div className="item-card-button">
        <Link to={paths.Item + item.id} className="btn success">
          Открыть
        </Link>
      </div>
    </div>
  );
};

export default Item;
