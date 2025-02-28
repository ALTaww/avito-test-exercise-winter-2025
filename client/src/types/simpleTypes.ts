export type IFieldTypes = keyof typeof fieldTypes;

export type IField =
  | {
      type: Exclude<IFieldTypes, "select">;
      name: string; // должно быть что-то типо keyof IItemsCategories, но там сужение типов
      label: string;
      required?: boolean;
    } // Все, кроме select
  | {
      type: "select";
      name: string; // то же самое
      label: string;
      required?: boolean;
      selectOptions: string[];
    }; // Только select

export interface IStringsObject {
  [key: string]: string;
}

export const fieldTypes = {
  text: "text",
  textarea: "textarea",
  select: "select",
  number: "number",
  file: "file",
  password: "password",
} as const;

export const fieldButtonTypes = {
  submit: "submit",
  button: "button",
} as const;

export type IFieldButtonTypes = keyof typeof fieldButtonTypes;
