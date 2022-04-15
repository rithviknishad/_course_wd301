import React, { useState, useEffect, useRef } from "react";
import EditField from "./EditField";
import { Link, navigate } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { fieldTypes, formField, textFieldTypes } from "../types/fieldTypes";

export function EditForm(props: { formId: Number }) {
  const [state, setState] = useState(
    () => getLocalForms().find((form) => form.id === props.formId)!
  );
  const [newFieldLabel, setNewFieldLabel] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => ({ ...field, value: "" })),
    });
  };

  const saveForm = () => {
    saveLocalForms(
      getLocalForms().map((form) => (form.id === props.formId ? state : form))
    );
  };

  useEffect(() => {
    state.id !== props.formId && navigate(`/forms/${state.id}`);
  }, [state.id, props.formId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveLocalForms(
        getLocalForms().map((form) => (form.id === props.formId ? state : form))
      );
    });
    return () => {
      clearTimeout(timeoutId);
    };
  }, [state, props]);

  useEffect(() => {
    document.title = `${state.title} | Form Editor`;
    titleRef.current?.focus();

    return () => {
      document.title = "React App";
    };
  }, [state.title]);

  const addField = () => {
    if (newFieldLabel.trim() === "") return;
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newFieldLabel,
          kind: fieldTypes.text,
          fieldType: textFieldTypes.text,
          value: "",
        },
      ],
    });
    setNewFieldLabel("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => id !== field.id),
    });
  };

  const updateField = (newField: formField) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id !== newField.id ? field : newField
      ),
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <input
        type="text"
        ref={titleRef}
        value={state.title}
        className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
        onChange={(e) => {
          setState({
            ...state,
            title: e.target.value,
          });
        }}
      />
      <div className="flex flex-col gap-6">
        {state.formFields.map((field) => {
          return (
            <EditField
              key={field.id}
              field={field}
              updateFieldCB={updateField}
              removeFieldCB={removeField}
            />
          );
        })}
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
          onClick={addField}
        >
          Add field
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => saveForm()}
        >
          Save
        </button>
        <Link
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          href="/forms"
        >
          Close
        </Link>
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={clearForm}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
