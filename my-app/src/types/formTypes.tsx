export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type formField = {
  id: number;
  label: string;
  type: string;
};

export type preview = {
  id: Number;
  answers: string[];
};
