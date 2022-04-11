import { formData, preview } from "../types/formTypes";

export const getLocalForms: () => formData[] = () => {
  const savedFormsFromStorage = localStorage.getItem("forms");
  return savedFormsFromStorage ? JSON.parse(savedFormsFromStorage) : [];
};

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(localForms));
};

export const getLocalPreviews: () => preview[] = () => {
  const savedPreviewsFromStorage = localStorage.getItem("previews");
  return savedPreviewsFromStorage ? JSON.parse(savedPreviewsFromStorage) : [];
};

export const saveLocalPreviews = (previews: preview[]) => {
  localStorage.setItem("previews", JSON.stringify(previews));
};
