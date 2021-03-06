import React, { ReactNode } from "react";
import { FormField } from "../types/fieldTypes";

export default function InputField(props: {
  field: FormField;
  updateFieldCB: (field: FormField) => void;
}) {
  let inputField: ReactNode;

  const field = props.field;
  switch (field.kind) {
    case "TEXT":
      inputField = (
        <input
          // type={`${field.fieldType}`}
          name={`${field.id}`}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          value={field.value}
          onChange={(e) => {
            props.updateFieldCB({ ...field, value: e.target.value });
          }}
        />
      );
      break;

    case "RADIO":
      inputField = (
        <div>
          {field.options.map((option, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <input
                  id={`radio-option-${index}`}
                  type={`${props.field.kind}`}
                  name={`${props.field.id}`}
                  value={option}
                  checked={option === field.value}
                  onChange={(e) => {
                    props.updateFieldCB({ ...field, value: e.target.value });
                  }}
                />
                <label htmlFor={`radio-option-${index}`}>{option}</label>
                <br />
              </div>
            );
          })}
        </div>
      );
      break;

    case "DROPDOWN":
      inputField = (
        <select
          value={field.value}
          onChange={(e) => {
            props.updateFieldCB({ ...field, value: e.target.value });
          }}
        >
          {field.options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      );
      break;

    default:
      inputField = (
        <p className="text-red-600">Render unimplemented for this field type</p>
      );
      break;
  }

  return (
    <>
      <label className="m-1">{props.field.label}</label>
      <div className="flex p-4">{inputField}</div>
    </>
  );
}
