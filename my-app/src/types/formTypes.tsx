import { Errors } from "./commons";
import { FormField } from "./fieldTypes";

export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
};

export type Submission = {
  id?: number;
  answers: Array<{ form_field: number; value: string }>;
  form?: Form;
};

export const validateForm = (form: Form) => {
  const errors: Errors<Form> = {};

  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  return errors;
};

export const validateFormField = (field: FormField) => {
  const errors: Errors<FormField> = {};

  if (field.label.length < 1) {
    errors.label = "Label is required";
  }
  if (field.label.length > 100) {
    errors.label = "Label must be less than 100 characters";
  }
  if (field.value.length > 100) {
    errors.value = "Value must be less than 100 characters";
  }

  return errors;
};

export const validateSubmission = (submission: Submission) => {
  const errors: Errors<Submission> = {};

  for (const answer of submission.answers) {
    if (answer.value.length < 1) {
      errors.answers = "Value is required";
    }
    if (answer.value.length > 100) {
      errors.answers = "Value must be less than 100 characters";
    }
  }

  return errors;
};
