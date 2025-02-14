import { MenuItem, TextField } from "@mui/material";
import React, { FC } from "react";
import {
  fieldTypes,
  IStringsObject,
  IField,
  fieldButtonTypes,
  IFieldButtonTypes,
  IFieldTypes,
} from "../../types/simpleTypes";
import Btn from "../Btn";

interface IComponent {
  errors: IStringsObject;
  fields: IField[];
  buttonType?: IFieldButtonTypes;
  handleChange: (name: string, value: string) => void;
  handleBlur: (name: string, value: string, type: IFieldTypes) => void;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  values: IStringsObject;
}

function returnField(
  field: IField,
  errors: IStringsObject,
  handleChange: (name: string, value: string) => void,
  handleBlur: (name: string, value: string, type: IFieldTypes) => void,
  value: string
) {
  const commonProps = {
    label: field.label,
    variant: "outlined" as const,
    error: !!errors[field.name],
    helperText: errors[field.name] || "",
    required: field.required,
    value: value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(field.name, e.target.value),
    onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
      handleBlur(field.name, e.target.value, field.type),
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
  handleBlur,
  handleClick,
  values,
}) => {
  return (
    <div className="form">
      {fields.map((field) => (
        <div key={field.name} className="form-row-container">
          {returnField(
            field,
            errors,
            handleChange,
            handleBlur,
            values[field.name]
          )}
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
