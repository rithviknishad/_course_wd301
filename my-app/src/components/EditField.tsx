import React, { useState } from "react";
import { FormField } from "../types/fieldTypes";

const changeFormFieldType = (
  oldField: FormField,
  newType: "TEXT" | "DROPDOWN" | "RADIO"
): FormField => {
  let carryOptions: string[] = [];
  switch (oldField.kind) {
    case "DROPDOWN":
    case "RADIO":
      carryOptions = [...oldField.options];
      break;
  }

  switch (newType) {
    case "TEXT":
      return {
        id: oldField.id,
        kind: "TEXT",
        label: oldField.label,
        // fieldType: textFieldTypes.text,
        value: "",
      };

    case "DROPDOWN":
      return {
        kind: "DROPDOWN",
        id: oldField.id,
        label: oldField.label,
        options: carryOptions,
        value: "",
      };

    case "RADIO":
      return {
        kind: "RADIO",
        id: oldField.id,
        label: oldField.label,
        options: carryOptions,
        value: "",
      };
  }
};

export default function EditField(props: {
  field: FormField;
  updateFieldCB: (field: FormField) => void;
  removeFieldCB: (id: number) => void;
}) {
  return (
    <div>
      <div className="flex">
        <input
          type="text"
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          value={props.field.label}
          onChange={(e) => {
            props.updateFieldCB({ ...props.field, label: e.target.value });
          }}
        />
        <select
          value={props.field.kind}
          className="m-4 p-2"
          onChange={(e) => {
            const selectedType = e.target.value as
              | "TEXT"
              | "DROPDOWN"
              | "RADIO";
            if (selectedType === props.field.kind) return;
            props.updateFieldCB(changeFormFieldType(props.field, selectedType));
          }}
        >
          {["TEXT", "DROPDOWN", "RADIO"].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={() => {
            props.removeFieldCB(props.field.id!);
          }}
        >
          Remove
        </button>
      </div>
      <FieldOptions field={props.field} updateFieldCB={props.updateFieldCB} />
    </div>
  );
}

function FieldOptions(props: {
  field: FormField;
  updateFieldCB: (field: FormField) => void;
}) {
  const field = props.field;
  const [newOptionLabel, setNewOptionLabel] = useState("");

  switch (field.kind) {
    // case "TEXT":
    //   return (
    //     <div className="flex items-center">
    //       <p>Teext field type: </p>
    //       <select
    //         value={field.fieldType}
    //         className="m-4 p-2"
    //         onChange={(e) => {
    //           let selectedType =
    //             textFieldTypes[e.target.value as keyof typeof textFieldTypes];
    //           if (selectedType === field.fieldType) return;
    //           props.updateFieldCB({ ...field, fieldType: selectedType });
    //         }}
    //       >
    //         {Object.keys(textFieldTypes).map((type, index) => (
    //           <option key={index} value={type}>
    //             {type}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   );
    case "DROPDOWN":
    case "RADIO":
      return (
        <div>
          <p>Options: </p>
          {field.options.map((option, index) => (
            <div key={index} className="flex gap-2 items-center">
              <p className="flex-1">
                {index + 1}. {option}
              </p>
              <button
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                onClick={(_) => {
                  props.updateFieldCB({
                    ...field,
                    options: field.options.filter((_, i) => i !== index),
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex gap-2 py-2">
            <input
              type="text"
              value={newOptionLabel}
              className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
              onChange={(e) => {
                setNewOptionLabel(e.target.value);
              }}
            />
            <button
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              onClick={(_) => {
                props.updateFieldCB({
                  ...field,
                  options: [...field.options, newOptionLabel],
                });
                setNewOptionLabel("");
              }}
            >
              Add option
            </button>
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
}
