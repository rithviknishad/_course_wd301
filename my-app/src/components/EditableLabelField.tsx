import React from "react";

export default function EditableLabelField(props: {
  id: number;
  label: string;
  fieldType: string;
  updateFieldLabelCB: (id: number, value: string) => void; // TODO: change this cb
  updateFieldTypeCB: (id: number, type: string) => void;
  removeFieldCB: (id: number) => void; // TODO: change this cb
}) {
  return (
    <>
      <div className="flex">
        <input
          type="text"
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          value={props.label}
          onChange={(e) => {
            props.updateFieldLabelCB(props.id, e.target.value);
          }}
        />
        <select
          value={props.fieldType}
          className="m-4 p-2"
          onChange={(e) => {
            props.updateFieldTypeCB(props.id, e.target.value);
          }}
        >
          {[
            "checkbox",
            "color",
            "date",
            "datetime-local",
            "email",
            "month",
            "number",
            "password",
            "radio",
            "range",
            "tel",
            "text",
            "time",
            "url",
            "week",
          ].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={() => {
            props.removeFieldCB(props.id);
          }}
        >
          Remove
        </button>
      </div>
    </>
  );
}
