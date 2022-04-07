import React, { useState, useEffect, useRef } from "react";
import LabelledInput from "./LabelledInput";

interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 0, value: "", label: "First Name", type: "text" },
  { id: 1, value: "", label: "Last Name", type: "text" },
  { id: 2, value: "", label: "Email", type: "email" },
  { id: 3, value: "", label: "Date of Birth", type: "date" },
  { id: 4, value: "", label: "Phone Number", type: "tel" },
];

const getLocalForms: () => formData[] = () => {
  const savedFormsFromStorage = localStorage.getItem("forms");
  return savedFormsFromStorage ? JSON.parse(savedFormsFromStorage) : [];
};

const initialState: () => formData = () => {
  const localForms = getLocalForms();

  if (localForms.length > 0) return localForms[0];

  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(localForms));
};

const saveForm = (currentState: formData) => {
  saveLocalForms(
    getLocalForms().map((form) => {
      return form.id === currentState.id ? currentState : form;
    })
  );
};

export function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(() => initialState());
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("component mounted...");
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);
  useEffect(() => {
    let timeout = setTimeout(() => {
      saveForm(state);
      console.log("State saved to...");
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
    console.log("clearing...");
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        console.log(field.label);
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
      <div className="flex gap-4">
        <input
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          value="Submit"
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => saveForm(state)}
        >
          Save Form
        </button>
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={clearForm}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
