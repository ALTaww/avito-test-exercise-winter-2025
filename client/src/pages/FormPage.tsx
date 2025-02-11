import React, { useState } from "react";
import { Form } from "../components";
import {
  fieldButtonTypes,
  fieldTypes,
  IField,
  IFieldErrors,
  IFieldTypes,
} from "../types/simpleTypes";

const fieldCategories = {
  realEstate: "Недвижимость",
  car: "Авто",
  services: "Услуги",
};

const startFormFields: IField[] = [
  {
    name: "Название",
    type: fieldTypes.text,
    required: true,
  },
  {
    type: fieldTypes.textarea,
    name: "Описание",
    required: true,
  },
  {
    type: fieldTypes.text,
    name: "Локация",
    required: true,
  },
  {
    type: fieldTypes.file,
    name: "Фото",
  },
  {
    type: fieldTypes.select,
    name: "Категория",
    required: true,
    selectOptions: [
      fieldCategories.realEstate,
      fieldCategories.car,
      fieldCategories.services,
    ],
  },
];

function validateField(
  name: string,
  value: string,
  fieldType: IFieldTypes
): string {
  if (!value.trim()) {
    return "Это поле обязательно";
  }
  switch (fieldType) {
    case fieldTypes.text:
      if (!isNaN(+value[0])) {
        return "Не может начинаться с цифры";
      }
      if (value.length < 3) {
        return "Длина должна быть не менее 3 символов";
      }
      break;
    case fieldTypes.textarea:
      if (value.length < 10) {
        return "Длина должна быть не менее 10 символов";
      }
      break;
    case fieldTypes.number:
      if (isNaN(+value)) {
        return "Должно быть числом";
      }
      break;
  }
  return "";
}

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<IFieldErrors>({});
  const [formData, setFormData] = useState<Record<string, string>>({});

  function validateForm(): boolean {
    const newErrors: IFieldErrors = {};

    startFormFields.forEach((field) => {
      if (field.required) {
        const error = validateField(
          field.name,
          formData[field.name] || "",
          field.type
        );
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Форма отправлена:", formData);
  }

  const handleChange = (name: string, value: string, type: IFieldTypes) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(errors);
    setErrors((prevErrors) => {
      const error = validateField(name, value, type);
      if (!error) {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      }
      return { ...prevErrors, [name]: error };
    });
  };

  function continueForm() {
    if (!validateForm()) return;

    console.log("Следующий шаг:", formData);

    setStep((step) => step++);
  }

  return (
    <div className="page form-page">
      <h1>Form</h1>
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Form
            fields={startFormFields}
            errors={errors}
            buttonType={fieldButtonTypes.button}
            handleChange={handleChange}
            handleClick={continueForm}
          />
        </form>
      </div>
    </div>
  );
};

export default FormPage;
