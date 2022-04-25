export type TextField = {
  id?: number;
  label: string;
  kind: "TEXT";
  value: string;
};

export type DropdownField = {
  id?: number;
  label: string;
  kind: "DROPDOWN";
  options: string[];
  value: string;
};

export type RadioField = {
  id?: number;
  label: string;
  kind: "RADIO";
  options: string[];
  value: string;
};

export type FormField = TextField | DropdownField | RadioField;
