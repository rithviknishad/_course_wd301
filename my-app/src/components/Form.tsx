import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

const formFields = [
  { id: 0, value: "", label: "First Name" },
  { id: 1, value: "", label: "Last Name" },
  { id: 2, value: "", label: "Email", type: "email" },
  { id: 3, value: "", label: "Date of Birth", type: "date" },
  { id: 4, value: "", label: "Phone Number", type: "tel" },
];

export function Form(props: { closeFormCB: () => void }) {
  const [fields, setFields] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setFields([
      ...fields,
      { id: Number(new Date()), label: newField, type: "text", value: "" },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => id !== field.id));
  };

  const updateFieldValue = (id: number, value: string) => {
    setFields(
      fields.map((field) => {
        return field.id !== id ? field : { ...field, value: value };
      })
    );
  };

  const clearForm = () => {
    console.log("clearing...");
    setFields(
      fields.map((field) => {
        console.log(field.label);
        return { ...field, value: "" };
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <div>
        {fields.map((field) => (
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
