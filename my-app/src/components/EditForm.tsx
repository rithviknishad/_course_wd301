import React, { useState, useEffect, useRef, useReducer } from "react";
import EditField from "./EditField";
import { Link, navigate } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { fieldTypes, formField, textFieldTypes } from "../types/fieldTypes";
import { formData } from "../types/formTypes";

const getNewField = (label: string): formField => {
  return {
    id: Number(new Date()),
    label: label,
    kind: fieldTypes.text,
    fieldType: textFieldTypes.text,
    value: "",
  };
};

type AddFieldAction = {
  type: "add_field";
  label: string;
  callback: () => void;
};

type RemoveFieldAction = {
  type: "remove_field";
  id: number;
};

type UpdateTitleAction = {
  type: "update_title";
  title: string;
};

type UpdateFormFieldAction = {
  type: "update_field";
  field: formField;
};

type FormAction =
  | AddFieldAction
  | RemoveFieldAction
  | UpdateTitleAction
  | UpdateFormFieldAction;

const reducer = (state: formData, action: FormAction) => {
  switch (action.type) {
    case "add_field":
      if (action.label.trim() === "") return state;
      const newField = getNewField(action.label);
      action.callback();
      return {
        ...state,
        formFields: [...state.formFields, newField],
      };

    case "remove_field":
      return {
        ...state,
        formFields: state.formFields.filter((field) => action.id !== field.id),
      };

    case "update_title":
      return {
        ...state,
        title: action.title,
      };

    case "update_field":
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.field.id ? action.field : field
        ),
      };
  }
};

export function EditForm(props: { formId: Number }) {
  const [state, dispatch] = useReducer(
    reducer,
    null,
    () => getLocalForms().find((form) => form.id === props.formId)!
  );
  const [newFieldLabel, setNewFieldLabel] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  const saveForm = () => {
    saveLocalForms(
      getLocalForms().map((form) => (form.id === props.formId ? state : form))
    );
  };

  useEffect(() => {
    state.id !== props.formId && navigate(`/forms/${state.id}`);
  }, [state.id, props.formId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveLocalForms(
        getLocalForms().map((form) => (form.id === props.formId ? state : form))
      );
    });
    return () => {
      clearTimeout(timeoutId);
    };
  }, [state, props]);

  useEffect(() => {
    document.title = `${state.title} | Form Editor`;
    titleRef.current?.focus();

    return () => {
      document.title = "React App";
    };
  }, [state.title]);

  const updateField = (field: formField) => {
    dispatch({
      type: "update_field",
      field: field,
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
          dispatch({
            type: "update_title",
            title: e.target.value,
          });
        }}
      />
      <div className="flex flex-col gap-6">
        {state.formFields.map((field) => {
          return (
            <EditField
              key={field.id}
              field={field}
              updateFieldCB={updateField}
              removeFieldCB={(id: number) => {
                dispatch({
                  type: "remove_field",
                  id: id,
                });
              }}
            />
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newFieldLabel}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          onChange={(e) => {
            setNewFieldLabel(e.target.value);
          }}
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => {
            dispatch({
              type: "add_field",
              label: newFieldLabel,
              callback: () => {
                setNewFieldLabel("");
              },
            });
          }}
        >
          Add field
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => saveForm()}
        >
          Save
        </button>
        <Link
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          href="/forms"
        >
          Close
        </Link>
      </div>
    </div>
  );
}
