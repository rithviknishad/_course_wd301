import React, { useEffect, useState } from "react";
import { EditForm } from "./EditForm";

export interface formData {
  title: string;
  formFields: formField[];
}

export interface formField {
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

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(localForms));
};

export function FormsList(props: { closeFormCB: () => void }) {
  const [forms, setForms] = useState(getLocalForms());
  const [selectedForm, setSelectedForm] = useState<formData | null>(null);

  useEffect(() => {
    document.title = "Form Editor";
    return () => {
      document.title = "React App";
    };
  });

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      saveLocalForms(forms);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [forms, props]);

  const addNewForm = () => {
    setForms([
      {
        title: "Untitled Form",
        formFields: initialFormFields,
      },
      ...forms,
    ]);
  };

  const removeForm = (form: formData) => {
    setForms(forms.filter((f) => form !== f));
  };

  return selectedForm ? (
    <EditForm
      form={selectedForm}
      saveFormCB={(currentState: formData) => {
        const indexOfSelectedForm = forms.indexOf(selectedForm);
        saveLocalForms(
          forms.map((form, index) =>
            index === indexOfSelectedForm ? currentState : form
          )
        );
      }}
      closeFormCB={() => {
        setSelectedForm(null);
        setForms(getLocalForms());
      }}
    />
  ) : (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <p>Forms</p>
      <div>
        {forms.map((form, index) => (
          <FormTile
            key={index}
            form={form}
            openFormCB={() => setSelectedForm(form)}
            removeFormCB={() => removeForm(form)}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={addNewForm}
        >
          New Form
        </button>
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={props.closeFormCB}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function FormTile(props: {
  form: formData;
  openFormCB: () => void;
  removeFormCB: () => void;
}) {
  return (
    <div className="flex">
      <p className="p-4 flex-1">{props.form.title}</p>
      <button
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        onClick={props.openFormCB}
      >
        Edit
      </button>
      <button
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        onClick={props.removeFormCB}
      >
        Delete
      </button>
    </div>
  );
}
