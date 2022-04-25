import { FormField } from "../types/fieldTypes";
import { Form, Submission } from "../types/formTypes";
import { User } from "../types/userTypes";

export const getLocalForms = () => {
  const jsonData = localStorage.getItem("forms");
  return (jsonData ? JSON.parse(jsonData) : []) as Form[];
};

export const updateLocalForms = (forms: Form[]) => {
  localStorage.setItem("forms", JSON.stringify(forms));
};

export const updateLocalForm = (form: Form) => {
  const forms = getLocalForms();

  if (forms.find((f) => f.id === form.id)) {
    updateLocalForms(forms.map((f) => (f.id === form.id ? form : f)));
  } else {
    updateLocalForms([...forms, form]);
  }
};

export const getLocalFormFields = (formId: number) => {
  const jsonData = localStorage.getItem(`fields_${formId}`);
  return (jsonData ? JSON.parse(jsonData) : []) as FormField[];
};

export const updateLocalFormFields = (formId: number, fields: FormField[]) => {
  localStorage.setItem(`forms_${formId}`, JSON.stringify(fields));
};

export const getLocalSubmissions = (formId: number) => {
  const jsonData = localStorage.getItem(`submissions_${formId}`);
  return (jsonData ? JSON.parse(jsonData) : []) as Submission[];
};

export const setLocalSubmissions = (
  formId: number,
  submissions: Submission[]
) => {
  localStorage.setItem(`submissions_${formId}`, JSON.stringify(submissions));
};

// Auth utils

export const getCurrentUser: () => User | null = () => {
  const jsonData = localStorage.getItem("current_user");
  return jsonData ? (JSON.parse(jsonData) as User) : null;
};

export const setCurrentUser = (user: User) => {
  if (user.username.length === 0) {
    localStorage.removeItem("current_user");
  } else {
    localStorage.setItem("current_user", JSON.stringify(user));
  }
};

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthToken = (token: string) =>
  localStorage.setItem("token", token);

export const clearAuthToken = () => localStorage.removeItem("token");

export const isAuthenticated = () => getAuthToken() !== null;
