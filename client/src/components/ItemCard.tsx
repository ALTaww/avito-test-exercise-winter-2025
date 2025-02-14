import React, { FC } from "react";
import { IItems } from "../types/types";
import placeholderImage from "../assets/images/placeholder-image.webp";
import { Link } from "react-router-dom";
import { paths } from "../paths";
import Btn from "./Btn";
import "../css/item-card.css";

interface IComponent extends React.HTMLAttributes<HTMLDivElement> {
  item: IItems;
  props?: unknown;
}

const Item: FC<IComponent> = ({ item, ...props }) => {
  return (
    <div className="item-card">
      <div
        className={`item-card-image image-container${
          props.className ? " " + props.className : ""
        }`}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <img src={placeholderImage} alt={item.name} />
        )}
      </div>
      <div className="item-card-info">
        <h3 className="item-card-info-name">
          <Link to={paths.Item + item.id} className="text">
            {item.name}
          </Link>
        </h3>
        <p className="item-card-info-type">{item.type}</p>
        <p className="item-card-info-location">{item.location}</p>
      </div>
      <div className="item-card-button">
        <Link to={paths.Item + item.id}>
          <Btn color="success" variant="contained">
            Открыть
          </Btn>
        </Link>
      </div>
    </div>
  );
};

export default Item;
