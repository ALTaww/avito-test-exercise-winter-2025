import { Pagination } from "@mui/material";
import React, { FC } from "react";

interface IComponent {
  itemsCount: number;
  itemsPerPage: number;
  disabled?: boolean;
  page?: number;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationMy: FC<IComponent> = ({
  itemsCount,
  itemsPerPage,
  disabled,
  page,
  onChange,
}) => {
  return (
    <div
      className="pagination"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={Math.ceil(itemsCount / itemsPerPage)}
        variant="outlined"
        color="primary"
        disabled={disabled}
        page={page}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationMy;
