import React from "react";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string | undefined;
  updateFieldCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
  value: string;
}) {
  return (
    <>
      <label className="m-1">{props.label}</label>
      <div className="flex">
        <input
          type={props.fieldType ?? "text"}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          value={props.value}
          onChange={(e) => {
            props.updateFieldCB(props.id, e.target.value);
          }}
        />
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
