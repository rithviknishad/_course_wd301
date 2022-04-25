import { PaginationParams } from "../types/commons";
import { FormField } from "../types/fieldTypes";
import { Form, Submission } from "../types/formTypes";
import { AuthToken, AuthTokenParams } from "../types/userTypes";
import { clearAuthToken, getAuthToken, setCurrentUser } from "./storageUtils";

export const API_BASE_URL =
  process.env.API_BASE_URL || "https://tsapi.coronasafe.live/api";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function request(
  endpoint: `/${string}/`,
  method: RequestMethod = "GET",
  data: any = {}
) {
  let url = `${API_BASE_URL}${endpoint}`;
  let body = data ? JSON.stringify(data) : null;

  if (method === "GET") {
    if (data) {
      const queryParams = `${Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join("&")}`;

      if (queryParams.length > 0) {
        url += `?${queryParams}`;
      }
    }
    body = null;
  }

  let auth: string = "";

  const auth_token = getAuthToken();
  if (auth_token) auth = "Token " + auth_token;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: body,
  });

  if (response.ok) {
    if (method === "DELETE") return { deleted: true };
    return await response.json();
  } else {
    throw Error(await response.json());
  }
}

// Authentication Related API utils

export const login = async (
  credentials: AuthTokenParams
): Promise<AuthToken> => {
  const response = await request("/auth-token/", "POST", credentials);
  await me();
  return response;
};

export const me = async () => {
  const response = await request("/users/me/");
  setCurrentUser(response);
  return response;
};

export const logout = (): void => {
  clearAuthToken();
  window.location.reload();
};

// Form related API utils

export const listForms = async (pageParams?: PaginationParams) => {
  const result: Form[] = (await request("/forms/", "GET", pageParams)).results;
  return result;
};

export const getForm = async (formId: number) => {
  const result: Form = await request(`/forms/${formId}/`, "GET");
  return result;
};

export const createForm = (form: Form) => request("/forms/", "POST", form);

export const updateForm = (formId: number, deltas: Partial<Form>) =>
  request(`/forms/${formId}/`, "PATCH", deltas);

export const deleteForm = (formId: number) =>
  request(`/forms/${formId}/`, "DELETE");

// Form Fields

export const listFormFields = async (formId: number) => {
  const result: FormField[] = (await request(`/forms/${formId}/fields/`))
    .results;
  return result;
};

export const createFormField = (formId: number, field: FormField) =>
  request(`/forms/${formId}/fields/`, "POST", field);

export const updateFormField = async (
  formId: number,
  fieldId: number,
  field: Partial<FormField>
) => request(`/forms/${formId}/fields/${fieldId}/`, "PATCH", field);

export const deleteFormField = (formId: number, fieldId: number) =>
  request(`/forms/${formId}/fields/${fieldId}/`, "DELETE");

// Submissions

export const listSubmissions = async (formId: number) => {
  const results: Submission[] = (await request(`/forms/${formId}/submission/`))
    .results;
  return results;
};

export const createSubmission = (formId: number, submission: Submission) =>
  request(`/forms/${formId}/submission/`, "POST", submission);
