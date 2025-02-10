import React, { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IComponent {
  type?: "classic" | "circle-dots" | "dots";
  text?: string | null;
}

const Loader: FC<IComponent> = ({ type = "classic", text = "Loading..." }) => {
  return (
    <div className="loader-component">
      {type === "classic" && <Icon icon="eos-icons:loading" />}
      {type === "circle-dots" && <Icon icon="eos-icons:bubble-loading" />}
      {type === "dots" && <Icon icon="eos-icons:three-dots-loading" />}
      {text ? <div className="loader">{text}</div> : null}
    </div>
  );
};

export default Loader;
