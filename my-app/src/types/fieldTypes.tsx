export enum fieldTypes {
  text = "text",
  dropdown = "dropdown",
  radio = "radio",
  multiSelect = "multiSelect",
}

export enum textFieldTypes {
  text = "text",
  email = "email",
  date = "date",
}
export type TextField = {
  kind: fieldTypes.text;
  id: number;
  label: string;
  fieldType: textFieldTypes;
  value: string;
};

export type DropdownField = {
  kind: fieldTypes.dropdown;
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type RadioField = {
  kind: fieldTypes.radio;
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type MultiSelectDropdownField = {
  kind: fieldTypes.multiSelect;
  id: number;
  label: string;
  options: string[];
  values: string[];
};

export type formField =
  | TextField
  | DropdownField
  | RadioField
  | MultiSelectDropdownField;
