import { MenuItem, TextField } from "@mui/material";
import React, { FC } from "react";
import {
  fieldTypes,
  IFieldErrors,
  IField,
  fieldButtonTypes,
  IFieldButtonTypes,
  IFieldTypes,
} from "../../types/simpleTypes";
import Btn from "../Btn";

interface IComponent {
  errors: IFieldErrors;
  fields: IField[];
  buttonType?: IFieldButtonTypes;
  handleChange: (name: string, value: string, type: IFieldTypes) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function returnField(
  field: IField,
  errors: IFieldErrors,
  handleChange: (name: string, value: string, type: IFieldTypes) => void
) {
  const commonProps = {
    label: field.name,
    variant: "outlined" as const,
    error: !!errors[field.name],
    helperText: errors[field.name] || "",
    required: field.required,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
      handleChange(field.name, e.target.value, field.type),
    sx: { mb: 2 },
    type: field.type,
  };

  let typeSpecificProps = {};

  if (field.type === fieldTypes.textarea) {
    typeSpecificProps = { multiline: true, rows: 4 };
  }

  if (field.type === fieldTypes.select) {
    typeSpecificProps = {
      select: true,
      defaultValue: "", // Изначально ничего нет (ругается MUI)
      sx: { ...commonProps.sx, minWidth: 160 },
      children: field.selectOptions.map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      )),
    };
  }

  if (field.type === fieldTypes.file) {
    typeSpecificProps = {
      slotProps: {
        inputLabel: {
          shrink: true,
        },
      },
    };
  }

  return <TextField {...commonProps} {...typeSpecificProps} />;
}

const Form: FC<IComponent> = ({
  errors,
  fields,
  buttonType = "submit",
  handleChange,
  handleClick,
}) => {
  return (
    <div className="form">
      {fields.map((field) => (
        <div key={field.name} className="form-row-container">
          {returnField(field, errors, handleChange)}
        </div>
      ))}
      <Btn
        type={buttonType}
        variant="contained"
        color="primary"
        onClick={(e) => handleClick?.(e)}
      >
        {buttonType === fieldButtonTypes.button ? "Далее" : "Отправить"}
      </Btn>
    </div>
  );
};

export default Form;
