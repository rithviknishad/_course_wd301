import { formData } from "../types/formTypes";

export const getLocalForms: () => formData[] = () => {
  const savedFormsFromStorage = localStorage.getItem("forms");
  return savedFormsFromStorage ? JSON.parse(savedFormsFromStorage) : [];
};

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(localForms));
};
