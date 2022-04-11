import { Link, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import { formData, formField } from "../types/formTypes";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";

const initialFormFields: formField[] = [
  { id: 0, label: "First Name", type: "text" },
  { id: 1, label: "Last Name", type: "text" },
  { id: 2, label: "Email", type: "email" },
  { id: 3, label: "Date of Birth", type: "date" },
  { id: 4, label: "Phone Number", type: "tel" },
];

export function FormsList() {
  const [forms, setForms] = useState(getLocalForms());

  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

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
  }, [forms]);

  const addNewForm = () => {
    setForms([
      {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields,
      },
      ...forms,
    ]);
  };

  const removeForm = (form: formData) => {
    setForms(forms.filter((f) => form !== f));
  };

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <p className="text-xl">Forms</p>
      <label>Search</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <input
          type="text"
          name="search"
          value={searchString}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </form>
      <div>
        {forms
          .filter((form) =>
            form.title.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((form, index) => (
            <FormTile
              key={index}
              form={form}
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
        <Link
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          href="/"
        >
          Close
        </Link>
      </div>
    </div>
  );
}

function FormTile(props: { form: formData; removeFormCB: () => void }) {
  return (
    <div className="flex">
      <p className="p-4 flex-1">{props.form.title}</p>
      <Link
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        href={`preview/${props.form.id}`}
      >
        Preview
      </Link>
      <Link
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        href={`forms/${props.form.id}`}
      >
        Edit
      </Link>
      <button
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        onClick={props.removeFormCB}
      >
        Delete
      </button>
    </div>
  );
}
