import React from "react";
import { formField } from "../types/formTypes";

export default function LabelledInput(props: {
  field: formField;
  updateFieldCB: (id: number, value: string) => void;
  value: string;
}) {
  return (
    <>
      <label className="m-1">{props.field.label}</label>
      <div className="flex">
        <input
          type={props.field.type ?? "text"}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          value={props.value}
          onChange={(e) => {
            props.updateFieldCB(props.field.id, e.target.value);
          }}
        />
      </div>
    </>
  );
}
