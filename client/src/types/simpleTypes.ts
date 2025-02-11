export type IFieldTypes = keyof typeof fieldTypes;

export type IField =
  | { type: Exclude<IFieldTypes, "select">; name: string; required?: boolean } // Все, кроме select
  | {
      type: "select";
      name: string;
      required?: boolean;
      selectOptions: string[];
    }; // Только select

export interface IFieldErrors {
  [key: string]: string;
}

export const fieldTypes = {
  text: "text",
  textarea: "textarea",
  select: "select",
  number: "number",
  file: "file",
} as const;

export const fieldButtonTypes = {
  submit: "submit",
  button: "button",
} as const;

export type IFieldButtonTypes = keyof typeof fieldButtonTypes;
