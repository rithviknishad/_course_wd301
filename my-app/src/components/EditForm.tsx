import React, { useState, useEffect, useRef } from "react";
import EditableLabelField from "./EditableLabelField";
import { Link, navigate } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";

export function EditForm(props: { formId: Number }) {
  // TODO: show form does not exist box if no form with specified id.
  const [state, setState] = useState(
    () => getLocalForms().find((form) => form.id === props.formId)!
  );
  const [newField, setNewField] = useState("");

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
    if (newField.trim() === "") return;
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        { id: Number(new Date()), label: newField, type: "text" },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => id !== field.id),
    });
  };

  const updateFieldLabel = (id: number, newLabel: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id !== id ? field : { ...field, label: newLabel }
      ),
    });
  };

  const updateFieldType = (id: number, newType: string) => {
    console.log("udating field type " + newType);
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id !== id ? field : { ...field, type: newType }
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
      <div>
        {state.formFields.map((field) => (
          <EditableLabelField
            key={field.id}
            id={field.id}
            label={field.label}
            fieldType={field.type}
            updateFieldLabelCB={updateFieldLabel}
            updateFieldTypeCB={updateFieldType}
            removeFieldCB={removeField}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newField}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          onChange={(e) => {
            setNewField(e.target.value);
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
