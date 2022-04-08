import React, { useState, useEffect, useRef } from "react";
import LabelledInput from "./LabelledInput";
import { formData } from "./FormsList";

export function EditForm(props: {
  form: formData;
  saveFormCB: (currentState: formData) => void;
  closeFormCB: () => void;
}) {
  const [state, setState] = useState(props.form);
  const [newField, setNewField] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `${state.title} | Form Editor`;
    titleRef.current?.focus();

    return () => {
      document.title = "React App";
    };
  }, [state.title]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.saveFormCB(state);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state, props]);

  const addField = () => {
    if (newField.trim() === "") return;

    setState({
      ...state,
      formFields: [
        ...state.formFields,
        { id: Number(new Date()), label: newField, type: "text", value: "" },
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

  const updateFieldValue = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        return field.id !== id ? field : { ...field, value: value };
      }),
    });
  };

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        return { ...field, value: "" };
      }),
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
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            fieldType={field.type}
            updateFieldCB={updateFieldValue}
            removeFieldCB={removeField}
            value={field.value}
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
          onClick={(_) => props.saveFormCB(state)}
        >
          Save
        </button>
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={props.closeFormCB}
        >
          Close
        </button>
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
