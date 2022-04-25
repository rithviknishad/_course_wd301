import React, { useState, useEffect, useRef } from "react";
import EditField from "./EditField";
import { Link } from "raviger";
import { FormField } from "../types/fieldTypes";
import { Form } from "../types/formTypes";
import {
  createFormField,
  deleteFormField,
  getForm,
  listFormFields,
  updateForm,
  updateFormField,
} from "../utils/apiUtils";
import { updateLocalForm, updateLocalFormFields } from "../utils/storageUtils";

const getNewField = (label: string): FormField => {
  return {
    id: Number(new Date()),
    label: label,
    kind: "TEXT",
    value: "",
  };
};

export default function EditForm(props: { formId: number }) {
  const [form, setForm] = useState<Form | undefined>();
  const [fields, setFields] = useState<FormField[] | undefined>();

  useEffect(() => {
    getForm(props.formId).then(setForm);
    listFormFields(props.formId).then(setFields);
  }, [props.formId]);

  useEffect(() => {
    if (form) updateLocalForm(form);
  }, [form]);

  useEffect(() => {
    if (fields) updateLocalFormFields(props.formId, fields);
  }, [fields, props.formId]);

  const [newFieldLabel, setNewFieldLabel] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `${form?.title ?? "Loading..."} | Form Editor`;
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, [form?.title]);

  const updateField = (field: FormField) => {
    if (fields) setFields(fields.map((f) => (f.id === field.id ? field : f)));
  };

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <input
        type="text"
        ref={titleRef}
        value={form?.title ?? "Loading..."}
        className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
        onChange={(e) => {
          e.preventDefault();
          if (form) setForm({ ...form, title: e.target.value });
        }}
      />
      <div className="flex flex-col gap-6">
        {fields?.map((field) => {
          return (
            <EditField
              key={field.id}
              field={field}
              updateFieldCB={updateField}
              removeFieldCB={(id: number) => {
                deleteFormField(props.formId, id).then((_) =>
                  setFields(fields.filter((f) => f.id !== id))
                );
              }}
            />
          );
        }) ?? <div>Fetching fields...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newFieldLabel}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          onChange={(e) => {
            setNewFieldLabel(e.target.value);
          }}
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => {
            createFormField(props.formId, getNewField(newFieldLabel)).then(
              (field) => setFields([...fields!, field])
            );
            setNewFieldLabel("");
          }}
        >
          Add field
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => {
            if (form) updateForm(props.formId, form);
            if (fields)
              fields.forEach((field) =>
                updateFormField(props.formId, field.id!, field)
              );
          }}
        >
          Save
        </button>
        <Link
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          href="/forms"
        >
          Close
        </Link>
      </div>
    </div>
  );
}
