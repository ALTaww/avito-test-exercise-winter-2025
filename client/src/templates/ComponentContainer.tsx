import React, { CSSProperties, FC } from "react";
import "../css/component-container.css";

interface IComponent {
  children: React.ReactNode;
  className?: CSSProperties;
  props?: unknown;
}

const ComponentContainer: FC<IComponent> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className="container">
      <div
        className={`container-body ${className ? " " + className : ""}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default ComponentContainer;
