import React, { useRef, useState } from "react";
import { Btn, Form } from "../components";
import {
  fieldButtonTypes,
  fieldTypes,
  IField,
  IFieldErrors,
  IFieldTypes,
} from "../types/simpleTypes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  createNewAbortController,
  fetchWithAbort,
  handleError,
} from "../utils";
import { itemsApi } from "../api";
import { Link } from "react-router-dom";
import { paths } from "../paths";
import { IItemsCategories, ItemTypeMap } from "../types/types";
import "../css/form-page.css";
import { ComponentContainer } from "../templates";
import { userStore } from "../store";
import { observer } from "mobx-react";

const fieldCategories = {
  realEstate: "Недвижимость",
  car: "Авто",
  services: "Услуги",
};

const startFormFields: IField[] = [
  {
    name: "name",
    label: "Название",
    type: fieldTypes.text,
    required: true,
  },
  {
    type: fieldTypes.textarea,
    name: "description",
    label: "Описание",
    required: true,
  },
  {
    type: fieldTypes.text,
    name: "location",
    label: "Локация",
    required: true,
  },
  {
    type: fieldTypes.file,
    label: "Фото",
    name: "image",
  },
  {
    type: fieldTypes.select,
    label: "Категория",
    name: "type",
    required: true,
    selectOptions: [
      fieldCategories.realEstate,
      fieldCategories.car,
      fieldCategories.services,
    ],
  },
];

const categoryFields: Record<keyof ItemTypeMap, IField[]> = {
  Недвижимость: [
    {
      label: "Тип недвижимости",
      name: "propertyType",
      type: fieldTypes.select,
      required: true,
      selectOptions: ["Квартира", "Дом", "Коттедж"],
    },
    {
      label: "Площадь (км^2)",
      name: "area",
      type: fieldTypes.number,
      required: true,
    },
    {
      label: "Количество комнат (кол-во)",
      name: "rooms",
      type: fieldTypes.number,
      required: true,
    },
    {
      label: "Цена (руб.)",
      name: "price",
      type: fieldTypes.number,
      required: true,
    },
  ],
  Авто: [
    {
      label: "Марка",
      name: "brand",
      type: fieldTypes.select,
      required: true,
      selectOptions: ["Toyota", "BMW", "Ford"],
    },
    { label: "Модель", name: "model", type: fieldTypes.text, required: true },
    {
      label: "Год выпуска",
      name: "year",
      type: fieldTypes.number,
      required: true,
    },
    {
      label: "Пробег (км)",
      name: "mileage",
      type: fieldTypes.number,
      required: false,
    },
  ],
  Услуги: [
    {
      label: "Тип услуги",
      name: "serviceType",
      type: fieldTypes.select,
      required: true,
      selectOptions: ["Ремонт", "Уборка", "Доставка"],
    },
    {
      label: "Опыт работы (лет)",
      name: "experience",
      type: fieldTypes.number,
      required: true,
    },
    {
      label: "Стоимость (руб.)",
      name: "cost",
      type: fieldTypes.number,
      required: true,
    },
    {
      label: "График работы",
      name: "workSchedule",
      type: fieldTypes.text,
      required: false,
    },
  ],
};

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
  // Не совсем правильный тип,
  const [formData, setFormData] = useState<IItemsCategories>({});
  const abortControllerRef = useRef<AbortController>(null);

  function validateForm(): boolean {
    const newErrors: IFieldErrors = {};

    startFormFields.forEach((field) => {
      if (field.required) {
        const error = validateField(
          field.name,
          // ошибка типов потому что внутри IField name строка
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

    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;
    try {
      const data = await fetchWithAbort(
        (signal) => itemsApi.createItem(formData, signal),
        signal
      );
      console.log(data);
      setStep(3);
    } catch (error) {
      const err = handleError(error);
      console.log(err);
    }

    console.log("Форма отправлена:", formData);
  }

  const handleChange = (name: string, value: string, type: IFieldTypes) => {
    setErrors((prevErrors) => {
      const error = validateField(name, value, type);
      if (!error) {
        const { [name]: _, ...rest } = prevErrors;
        setFormData((prev) => ({ ...prev, [name]: value }));
        return rest;
      }
      return { ...prevErrors, [name]: error };
    });
  };

  function continueForm() {
    if (!validateForm()) return;

    const selectedCategory = formData["type"];
    if (!selectedCategory || !categoryFields[selectedCategory]) {
      setErrors((prev) => ({ ...prev, type: "Выберите категорию" }));
      return;
    }

    setStep(2);
  }

  return (
    <div className="page form-page">
      <ComponentContainer>
        {userStore.isAuth ? (
          <React.Fragment>
            <h1>Form</h1>
            <div className="form-steps">Шаг {step} из 2</div>
            <div className="form-container">
              <form onSubmit={(e) => handleSubmit(e)}>
                {step === 1 && (
                  <div className="form-step first-step">
                    <Form
                      fields={startFormFields}
                      errors={errors}
                      buttonType={fieldButtonTypes.button}
                      handleChange={handleChange}
                      handleClick={continueForm}
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className="form-step second-step">
                    <Form
                      fields={categoryFields[formData["type"]]}
                      errors={errors}
                      buttonType={fieldButtonTypes.submit}
                      handleChange={handleChange}
                    />
                    <Btn
                      startIcon={<ArrowBackIcon />}
                      sx={{ mt: 2 }}
                      onClick={() => setStep((prev) => prev--)}
                    >
                      Назад
                    </Btn>
                  </div>
                )}
                {step === 3 && (
                  <div className="form-step third-step">
                    <p>
                      Объявление успешно создано{" "}
                      <Link to={paths.List}>К списку объявлений</Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </React.Fragment>
        ) : (
          <div>
            <p>Для создания объявления нужно войти в профиль</p>
            <Link to={paths.Login}>Войти</Link>
          </div>
        )}
      </ComponentContainer>
    </div>
  );
};

export default observer(FormPage);
